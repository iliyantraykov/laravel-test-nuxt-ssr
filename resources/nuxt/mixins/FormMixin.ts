import { Vue, Component } from 'nuxt-property-decorator';
import { namespace } from 'vuex-class';
import Form from 'form-backend-validation';
import EventBus from '@/utils/event-bus';
import { mergeWith } from 'lodash';

const { State } = namespace('Root');
const { Action } = namespace('Root');

Component.registerHooks([
  'beforeRouteLeave',
]);

@Component
export class FormMixin extends Vue {

  item: any = {};
  message: string = '';
  messageClass: string = '';
  fetchUri: string = '';
  form: Form;
  loading: boolean = true;
  confirmUnsavedChangesModal: boolean;
  skipChangeCheckOnSubmit: boolean = false;
  to: object;
  formatted_messages: Array<any> = [];
  response: object = {};
  error: object = {};

  constructor() {
    super();
    this.confirmUnsavedChangesModal = false;
    this.to = {};
  }

  displaySuccessMessage(message: string) {
    this.messageClass = 'alert alert-success';
    this.message = message;
  }

  displayErrorMessage(message: string) {
    this.messageClass = 'alert alert-danger';
    this.message = message;
  }

  clearMessage(): void {
    this.message = '';
  }

  //TODO: All functions that receive form , should probably use this.form instead of the parametar they recieve
  removeFormErrors(form, field: string) {
    form.errors.clear(field);
  }

  resetForm(form) {
    form.reset();
  }

  initFormFromItem(resetOnSuccess= true) {
    this.loading = true;
    this.$axios.$get(this.fetchUri)
      .then((response) => {
        // For this to work correctly you need to correctly define the object type and properties in the Objects file
        // ex. if expected values from server are id and name than they need to be defined in the object in Objects.ts
        this.item = mergeWith({}, this.item, response.data, (a, b) => b === null ? a : undefined);
        this.prepare_validation();
        this.form.populate(this.item);
        this.form.setInitialValues(this.item, resetOnSuccess);
        this.loading = false;
      });
  }

  async onSubmit(route, redirect_success, stop_redirect) {
    console.table(this.form);
    // console.log(route);
    // console.log('trying to submit');
    this.loading = true;
    return this.form.post(route)
      .then((response) => {
        this.response = response;
        // console.log('Request submitted successfully.');
        this.loading = false;
        if (!stop_redirect) {
          this.skipChangeCheckOnSubmit = true;
          this.$router.push({ name: redirect_success, params: { success: '1' } });
        }
        // TODO if there is a need send a message in laravel response and display that instead
        this.displaySuccessMessage('Success');
        EventBus.$emit('formSubmitSuccess');
      })
      .catch((error) => {
        this.error = error;
        // console.log('Request failed with:');
        // console.table(error);
        this.displayErrorMessage(error.message);
        this.loading = false;
      });
  }

  checkEqual(form) {
    console.table(form);
    let equal: boolean = true;
    for (const key in form.initial) {
      if (form.hasOwnProperty(key)) {
        equal = equal && JSON.stringify(form[key]) == JSON.stringify(form.initial[key]);
        // console.log(key + ' : '+ this.form[key]);
        if(!(JSON.stringify(form[key]) == JSON.stringify(form.initial[key]))){
            // console.log(form[key]);
            // console.log(form.initial[key]);
        }
        // console.log("Equal: ");
        // console.log(JSON.stringify(this.form[key]) == JSON.stringify(this.form.initial[key]));
      }
      else {
        console.warn('Missing prop: ' + key);
      }
    }
    // console.log(equal ? 'The form is unchanged' :'The form has been changed');
    return equal;
  }

  beforeRouteLeave (to, from, next) {
    // console.log("BeforeRouteLeave");
    if(this.checkEqual(this.form) || this.skipChangeCheckOnSubmit)
      next();
    else
    {
      next(false);
      this.to = to;
      this.confirmUnsavedChangesModal = true;
    }
  }

  confirmUnsavedChanges () {
    this.form.reset();
    this.$router.push(this.to);
    this.confirmUnsavedChangesModal = false;
  }

  cancelUnsavedChanges () {
    this.confirmUnsavedChangesModal = false;
  }

  refreshUser() {
    //this.$auth.fetch();
  }

  prepare_validation() {
    if (this.item.validation_messages !== undefined) {
      for (const [key, value] of Object.entries(this.item.validation_messages)) {
        let pieces = key.split('.');
        let field = pieces[0];
        let validation_type = pieces[1];
        if (this.formatted_messages[field] === undefined) {
          this.formatted_messages[field] = {};
        }
        //this.formatted_messages[field][validation_type] = this.$t(value);
        this.formatted_messages[field][validation_type] = value;
        // Workarround to make the new props reactive and visible in devtools
        this.formatted_messages = Object.assign({}, this.formatted_messages, {});
      }
    }
  }
}

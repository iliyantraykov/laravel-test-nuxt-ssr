<script lang="ts">
    import { Component, Emit, Vue } from 'nuxt-property-decorator';
    import SkIcon from '@/components/Icons/Icon.vue';
    import Form from 'form-backend-validation';

    @Component({
        components: {
          SkIcon
        },
    })
    export default class StayTuned extends Vue {

        readonly endpoint = 'guest/newsletter/subscribe';

        error: string = '';
        email: string = '';
        loading: boolean = false;

        constructor() {
            super();
        }

        checkForm(e) {
            this.error = '';

            if (!this.email || !this.validEmail(this.email)) {
                this.error = 'Bitte gib eine gültige E-Mailadresse ein.';
            }

            if (this.error == '') {
                if (!this.loading) {
                    this.loading = true;
                    this.$axios.$post(this.endpoint, {'email' : this.email}).then((response) => {
                        this.loading = false;
                        this.$router.push({
                            name: 'newsletter_subscribe',
                            query: {success: 'optin' }
                        });
                    }).catch((error) => {
                        this.loading = false;
                        if(this.$route.name == 'newsletter_subscribe'){
                            this.error = 'Fehler im Abonnement.';
                        }
                        if (error.response.data.errors && error.response.data.errors.email && error.response.data.errors.email['0'] == 'users.email.unique') {
                            if(this.$route.name == 'newsletter_subscribe'){
                                this.error = 'Du bist bereits in der Datenbank vorhanden.';
                            }
                            this.$router.push({
                                name: 'newsletter_subscribe',
                                query: {error: 'email_used' }
                            });
                        }
                    });
                }
            }

            e.preventDefault();
        }

        validEmail (email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    }
</script>

<template>
  <div class="landing-page__about__stay-tuned">
    <h3>Dran bleiben</h3>
    <p>Unser wöchentlicher Eventmagazin Newsletter  bringt Tipps, Trends und wissenswertes aus der Eventwelt kostenlos in deine Inbox.</p>
    <div class="vue-formulate-wrap vue-formulate-wrap--inline">
<!--      validation="required|email"-->
      <FormulateInput
        type="email"
        label="Deine E-Mail Adresse"
        v-model="email"
        name="email"
        :errors="error"
        class="formulate-input--dark-bg"
      />
      <button @click="checkForm" class="btn btn--primary btn--icon">
        <sk-icon type="arrow_right"></sk-icon>
      </button>
    </div>
  </div>
</template>

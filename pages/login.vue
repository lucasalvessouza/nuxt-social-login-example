<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <!-- <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="person"
                    type="text"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary">Login</v-btn>
              </v-card-actions> -->
              <v-card-actions class="justify-center">
                <v-btn
                  color="error"
                  @click="googleSignIn"
                  fab
                  large
                  dark
                >
                  <v-icon>mdi-google</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import firebase from 'firebase'

  export default {
    layout: 'login',
    props: {
      source: String
    },
    mounted () {
      this.$store.dispatch('logout')
    },
    methods: {
      googleSignIn () {
        this.provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(this.provider).then(async (result) => {
          // store the user ore wathever
          // this.login(result)
          const user = {
            refreshToken: result.user.refreshToken,
            uid: result.user.uid,
            displayName: result.user.displayName,
            photoURL: result.user.photoURL,
            email: result.user.email
          }
          await this.$store.dispatch('login', { user })
          this.$router.push('/')
        }).catch((e) => {
          console.log(e)
          // this.$snotify.error(e.message)
          // console.log(e)
        })
      }
    }
  }
</script>

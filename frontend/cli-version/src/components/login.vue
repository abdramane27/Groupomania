<template>
  <div class="card">
    <h1 class="card__title" v-if="mode == 'login'">Connexion</h1>
    <h1 class="card__title" v-else>Inscription</h1>
    <p class="card__subtitle" v-if="mode == 'login'">Tu n'as pas encore de compte ? <span class="card__action" @click="switchToCreateAccount()">Créer un compte</span></p>
    <p class="card__subtitle" v-else>Tu as déjà un compte ? <span class="card__action" @click="switchToLogin()">Se connecter</span></p>
    <div class="form-row" >
      <input v-model="InputEmail" class="form-row__input" type="text" placeholder="Adresse mail"/>
    </div>
    <div class="form-row" v-if="mode == 'create'">
      <input v-model="InputFirstname" class="form-row__input" type="text" name="InputFirstname" placeholder="Prénom"/>
      <input v-model="InputLastname" class="form-row__input" name="InputLastname" type="text" placeholder="Nom"/>
    </div>
    <div class="form-row">
      <input v-model="InputPassword" class="form-row__input" type="password" placeholder="Mot de passe"/>
    </div>
    <div class="form-row" v-if="mode == 'login' && status == 'error_login'">
      Adresse mail et/ou mot de passe invalide
    </div>
    <div class="form-row" v-if="mode == 'create' && status == 'error_create'">
      Adresse mail déjà utilisée
    </div>
    <div class="form-row">
      <button @click="login()" class="button" :class="{'button--disabled' : !validatedFields}" v-if="mode == 'login'">
        <span v-if="status == 'loading'">Connexion en cours...</span>
        <span v-else>Connexion</span>
      </button>
      <button @click="createAccount()" class="button" :class="{'button--disabled' : !validatedFields}" v-else>
        <span v-if="status == 'loading'">Création en cours...</span>
        <span v-else>Créer mon compte</span>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import router from "../router"
import Swal from "sweetalert2"
export default {
    name: "Inscription",
    data() {
        return {
            mode:"login",
            InputLastname: "",
            InputFirstname: "",
            InputEmail: "",
            InputPassword: "",
            submitted: false
        }
    },
     methods: {
    switchToCreateAccount: function () {
      this.mode = 'create';
    },
    switchToLogin: function () {
      this.mode = 'login';
    },
      login:function() {            
            this.submitted = true
            axios.post('http://127.0.0.1:3000/api/auth/login', { email: this.InputEmail, password: this.InputPassword })
            .then(function (response) {
                localStorage.setItem("token",response.data.token)
                localStorage.setItem("userId",response.data.userId)
                localStorage.setItem("lastname",response.data.lastname)
                localStorage.setItem("firstname",response.data.firstname)
                localStorage.setItem("avatar",response.data.avatar)
                localStorage.setItem("role",response.data.role)
                Swal.fire({
                    text: "Connexion réussie !",
                    footer: "Redirection en cours...",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    willClose: () => { router.push("/messages") }
                })  
            })
            .catch(function(error) {
                const codeError = error.message.split("code ")[1]
                let messageError = ""
                switch (codeError){
                    case "401": messageError = "Mot de passe erroné !"; break
                    case "403": messageError = "Le compte associé à cette adresse email a été supprimé !"; break
                    case "404": messageError = "Utilisateur non-trouvé !"; break
                }
                Swal.fire({
                    title: "Une erreur est survenue",
                    text: messageError || error.message,
                    icon: "error",
                    timer: 4000,
                    showConfirmButton: false,
                    timerProgressBar: true
                })  
            })
        },
 createAccount: function() {
            const InputLastname = this.InputLastname
            const InputFirstname = this.InputFirstname
            const InputEmail = this.InputEmail
            const InputPassword = this.InputPassword
            this.submitted = true;
            axios.post("http://127.0.0.1:3000/api/auth/signup", { lastname: InputLastname, firstname: InputFirstname, email: InputEmail, password: InputPassword })
            .then(function (response) {
                if (response.statusText==="Created") {
                    axios.post("http://127.0.0.1:3000/api/auth/login", { email: InputEmail, password: InputPassword })
                    .then(function (response) {
                        localStorage.setItem("token",response.data.token)
                        localStorage.setItem("userId",response.data.userId)
                        localStorage.setItem("Lastname",response.data.lastname)
                        localStorage.setItem("firstname",response.data.firstname)
                        localStorage.setItem("avatar",response.data.avatar)
                        localStorage.setItem("role",response.data.role)
                        Swal.fire({
                            text: "Inscription réussie !",
                            footer: "Connexion en cours...",
                            icon: "success",
                            timer: 2000,
                            showConfirmButton: false,
                            timerProgressBar: true,
                            willClose: () => { router.push("/messages") }
                        })
                    })
                    .catch(function(error) {
                        const codeError = error.message.split("code ")[1]
                        let messageError = ""
                        switch (codeError){
                            case "401": messageError = "Mot de passe erroné !";break
                            case "404": messageError = "Utilisateur non-trouvé !";break
                        }
                        Swal.fire({
                            title: "Une erreur est survenue",
                            text: messageError || error.message,
                            icon: "error",
                            timer: 3500,
                            showConfirmButton: false,
                            timerProgressBar: true
                        })  
                    })
                }
            })
            .catch(function (error) {
                const codeError = error.message.split("code ")[1]
                let messageError = ""
                switch (codeError){
                    case "401": messageError = "Adresse email déjà utilisée !";break
                }
                Swal.fire({
                    title: "Une erreur est survenue",
                    text: messageError || error.mesage,
                    icon: "error",
                    timer: 3500,
                    showConfirmButton: false,
                    timerProgressBar: true
                })
            });
        }

}





}
<template>
    <div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-8">
                    <div class="card bg-light">
                        <p class="h5 my-3 text-center" style="color:#091F43;">Bienvenu sur le réseau social interne</p>
                        <div class="card-header bg-light d-flex flex-column justify-content-center">
                            <img src="../assets/logo_orange.png" class="m-0 p-0" height="130" alt="logo groupomania">
                            <h5 class="h6 text-center" style="color:#091F43;">Veuillez-vous inscrire !</h5>
                        </div>
                        <div class="card-body col-md-8 col-lg-6 offset-md-2 offset-lg-3">
                            <form @submit.prevent="handleSubmit">
                                <div class="form-group">
                                    <label for="InputLastname" class="sr-only">Nom :</label>
                                    <input type="text" v-model="InputLastname" name="InputLastname" class="form-control" id="InputLastname" aria-describedby="nameHelp" placeholder="Nom" :class="{ 'is-invalid': submitted && !InputLastname }">
                                    <div v-show="submitted && !InputLastname" class="invalid-feedback">Un nom d'utilisateur est requis !</div>
                                </div>
                                <div class="form-group">
                                    <label for="InputFirstname" class="sr-only">Prénom :</label>
                                    <input type="text" v-model="InputFirstname" name="InputFirstname" class="form-control" id="InputFirstname" aria-describedby="nameHelp" placeholder="Prénom" :class="{ 'is-invalid': submitted && !InputFirstname }">
                                    <div v-show="submitted && !InputFirstname" class="invalid-feedback">Un prénom d'utilisateur est requis !</div>
                                </div>
                                <div class="form-group">
                                    <label for="InputEmail" class="sr-only">Adresse e-mail :</label>
                                    <input type="email" v-model="InputEmail" name="InputEmail" class="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="adresse e-mail" :class="{ 'is-invalid': submitted && !InputEmail }">
                                    <div v-show="submitted && !InputEmail" class="invalid-feedback">Une adresse e-mail est requise !</div>
                                </div>
                                <div class="form-group">
                                    <label for="InputPassword" class="sr-only">Mot de passe :</label>
                                    <input type="password" v-model="InputPassword" name="InputPassword" class="form-control" id="InputPassword" placeholder="mot de passe" :class="{ 'is-invalid': submitted && !InputPassword }">
                                    <div v-show="submitted && !InputPassword" class="invalid-feedback" >Un mot de passe est requis !</div>
                                </div>
                                <button class="btn btn-primary btn-sm btn-block">S'incrire</button>
                            </form>
                        </div>
                        <div class="card-footer bg-light">
                            <span class="text-dark">Déjà un compte ? <router-link to="/connexion">Connectez-vous</router-link> !</span>
                        </div>
                    </div>
                </div>
            </div>
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
            InputLastname: "",
            InputFirstname: "",
            InputEmail: "",
            InputPassword: "",
            submitted: false
        }
    },
    methods: {
        handleSubmit() {
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
</script>

<style>
    body {
        background-color: #f85f06
    }
    .m-0{
        width: auto;
    }
</style>
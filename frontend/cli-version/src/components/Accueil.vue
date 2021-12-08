<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-8">
                <div class="card bg-light">
                    <p class="h5 my-3 text-center" style="color:#091F43;">Bienvenu sur le réseau social interne</p>
                    <div class="card-header bg-light d-flex flex-column justify-content-center">
                        <img src="../assets/logo_orange.png" class="m-0 p-0"  alt="logo groupomania">
                        
                    </div>
                    <div class="card-body">
                        <h6>Créer afin d'améloirer les échanges au sein de l'entreprise.</h6>
                        <h6>Cette application est strictement réservé au personnel du groupe.</h6>
                        <div class="card-login">
                        <button class="modal-title h6"><router-link to="/connexion" style="text-decoration:none" >Se connecter</router-link></button> 
                        <button class="modal-title h6"><router-link to="/inscription" style="text-decoration:none">S'inscrire</router-link></button>
                        </div>   
                    </div>
                    <div class="card-footer bg-light d-flex justify-content-between">
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    Name: "Accueil"
}
</script>

<style>
    body {
        background-color: #f85f06
    }
    .m-0{
        width: auto;
    }
    .card-body{
        text-align: center;
        
    }
    .card-login{
        margin-top: 20px;
        padding-top: 15px;
        padding-bottom: 15px;
        display: flex;
        flex-direction: column ;
       align-items: center;
    }
    .modal-title{
        width: 20%;
        margin-top: 10px;
        background: #eeeded;;
        border: none;
        border-radius: 10px;
        padding: 7px;
         
        
        
    }
   
</style>
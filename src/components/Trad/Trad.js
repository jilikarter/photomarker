import React, { Component } from 'react';


export class Trad extends Component {

    state = {
        'fr-FR': {

            /* LOGIN - LOG IN */
            'login.connection.title': "Connectez vous",
            'login.connection.error-message': "Le mot de passe et/ou saisi n'est pas correct. En cas d'oubli ou perte de mot de passe, vous pouvez réinitialiser le mot de passe en cliquant ci-dessous.",
            'login.connection.reset-link': "mot de passe oublié",
            'login.connection.submit': "Accéder",
            'login.connection.separator': 'Ou',

            /* LOGIN - TO REGISTERING */
            'login.register.title': "Enregistrez-vous",
            'login.register.explain': "Veuillez rentrer ci-dessous le mot de passe qui vous a été fourni avec l'adresse du site",
            'login.register.error-message': "Le mot de passe saisi n'est pas correct. En cas d'oubli ou perte de mot de passe, veuillez vous rapprochez de la personne qui vous l'a fourni.",
            'login.register.submit': "Créer votre compte",

            /* LOGIN - TOAST */
            'login.toast.empty': "Les champs doivent être remplis",
            'login.toast.confirmEmail': "Veuillez confirmer votre email via le mail de confirmation qui vous a été envoyé",
            'login.toast.userNotFound': "Il n'y a aucun compte avec cet email",
            'login.toast.wrongPassword': "Le mot de passe ou l'email ne correspondent pas",
            'login.toast.userDisabled': "Votre compte a été désactivé, veuillez contacter le responsable du site",
            'login.toast.default': "Une erreur est survenue lors de la tentative de connection, veuillez réessayer plus tard : code erreur 5",
            'login.toast.signOut': "Vous avez bien été déconnecté",

            /* SIGN IN */
            'signIn.title': "Je crée mon compte",
            'signIn.info': "Après la création du compte, un mail vous sera envoyé pour confirmer votre email. Pensez à cliquer sur le lien.",
            'signIn.submit': "Créer mon compte",

            /* SIGN IN - TOAST */
            'signIn.toast.updateUsername': "Votre pseudo n'a pas été enregistré, vous pourrez le remplir de nouveau dans le menu paramètre",
            'signIn.toast.confirmEmail': "Votre compte a bien été crée. Un mail vous a été envoyé pour la validation du compte, veuillez cliquer sur le lien dans l'email.",
            'signIn.toast.emailAlreadyUsed': "Un compte existe déjà avec cette adresse email",
            'signIn.toast.weakPassword': "Le mot de passe est trop court (6 caractères minimum)",
            'signIn.toast.default': "Une erreur dans la création de compte est survenue, veuillez contacter le responsable du site : code error 3",
            'signIn.toast.empty': "Veuillez remplir tous les champs",

            /* REINITIALIZE */
            'reinitialize.title': "Réinitialisation du mot de passe",
            'reinitialize.submit': "Réinitialiser",
            'reinitialize.return': "Retour",
            'reinitialize.goBack': "Revenir à l'accueil",

            /* REINITIALIZE - TOAST */
            'reinitialize.toast.mailSend': "Un email vous a été envoyé",
            'reinitialize.toast.invalidEmail': "Le format du mail est invalide",
            'reinitialize.toast.userNotFound': "L'email ne correspond a aucun compte",
            'reinitialize.toast.default': "Une erreur est survenue lors de la tentative. Veuillez contacter le responsable du site : code erreur 4",
            'reinitialize.toast.empty': "Le champ est vide",

            /* HOME */
            'home.title': "Mon premier album",

            /* BIRTH */
            'birth.name': "Je m'appelle",

            /* BIRTH - TOAST */
            'birth.toast.save.success': "Les données ont bien été mise à jour",

            /* MENU */
            'menu.lastConnected': "dernière connexion",
            'menu.profile': "Mon profil",
            'menu.signOut': "Se déconnecter",

            /* EDIT PROFILE */
            'editProfile.title': "Edition du profil",
            'editProfile.submit': "Sauvegarder",
            'editProfile.return': "Retour",

            /* EDIT PROFILE - TOAST */
            'editProfile.toast.success': "Votre profil a bien été mis à jour",
            'editProfile.toast.error': "Une erreur est survenue lors de l'enregistrement, veuillez contacter le responsable du site : code erreur 6",

            /* TILE - TOAST */
            'tile.toast.delete.success': "La photo a bien été supprimée",
            'tile.toast.save.success': "La photo a bien été mise à jour",

        },
        'en-EN': {

            /* LOGIN - LOG IN */
            'login.connection.title': "Login to your account",
            'login.connection.error-message': "The password and/or entry is not correct. In case you forget or lose your password, you can reset it by clicking below.",
            'login.connection.reset-link': "forgotten password",
            'login.connection.submit': "Access to the site",
            'login.connection.separator': 'Or',

            /* LOGIN - TO REGISTERING */
            'login.register.title': "Register yourself",
            'login.register.explain': "Please enter below the password that was provided to you with the site address",
            'login.register.error-message': "The password entered is not correct. In case you forget or lose your password, please contact the person who provided it.",
            'login.register.submit': "Create your account",

            /* LOGIN - TOAST */
            'login.toast.empty': "The fields must be filled in",
            'login.toast.confirmEmail': "Please confirm your email via the confirmation email that was sent to you",
            'login.toast.userNotFound': "There are no accounts with this email",
            'login.toast.wrongPassword': "The password or email does not match",
            'login.toast.userDisabled': "Your account has been deactivated, please contact the site manager",
            'login.toast.default': "An error occurred during the connection attempt, please try again later: error code 5",
            'login.toast.signOut': "You have been disconnected.",

            /* SIGN IN */
            'signIn.title': "I create my account",
            'signIn.info': "After the account creation, an email will be sent to you to confirm your email. Remember to click on the link.",
            'signIn.submit': "Create my account",

            /* SIGN IN - TOAST */
            'signIn.toast.updateUsername': "Your username has not been saved, you can fill it in again in the parameter menu",
            'signIn.toast.confirmEmail': "Your account has been created. An email has been sent to you for account validation, please click on the link in the email.",
            'signIn.toast.emailAlreadyUsed': "An account already exists with this email address",
            'signIn.toast.weakPassword': "The password is too short (6 characters minimum)",
            'signIn.toast.default': "An error in the account creation has occurred, please contact the site manager: error code 3",
            'signIn.toast.empty': "Please fill in all fields",

            /* REINITIALIZE */
            'reinitialize.title': "Resetting the password",
            'reinitialize.submit': "Reset",
            'reinitialize.return': "Return",
            'reinitialize.goBack': "Return to home page",

            /* REINITIALIZE - TOAST */
            'reinitialize.toast.mailSend': "An email has been sent to you",
            'reinitialize.toast.invalidEmail': "The format of the email is invalid",
            'reinitialize.toast.userNotFound': "The email does not match any account",
            'reinitialize.toast.default': "An error occurred during the attempt. Please contact the site manager: error code 4",
            'reinitialize.toast.empty': "The field is empty",

            /* HOME */
            'home.title': "My first album",

            /* BIRTH */
            'birth.name': "My name is",

            /* BIRTH - TOAST */
            'birth.toast.save.success': "The data has been updated",

            /* MENU */
            'menu.lastConnected': "last connection",
            'menu.profile': "My profile",
            'menu.signOut': "Disconnect from the site",

            /* EDIT PROFILE */
            'editProfile.title': "Editing the profile",
            'editProfile.submit': "Save",
            'editProfile.return': "Return",

            /* EDIT PROFILE - TOAST */
            'editProfile.toast.success': "Your profile has been updated",
            'editProfile.toast.error': "An error occurred during registration, please contact the site manager: error code 6",

            /* TILE - TOAST */
            'tile.toast.delete.success': "The photo has been deleted",
            'tile.toast.save.success': "The photo has been updated",
        }
    };


    getCode(code) {

        const { lang } = this.props;

        if(typeof lang === 'undefined') {

            console.error('la langue n\'est pas settee');
        } else if(typeof this.state[lang] === 'undefined') {

            console.error('la langue n\'existe pas : ' + lang);
        } else if(typeof this.state[lang][code] === 'undefined') {

            console.error('le code n\'existe pas : ' + code);
        } else {

            return this.state[lang][code];
        }
        return '[' + code + ']';

    }

    render() {

        const { code } = this.props;
        return (
            <React.Fragment>{this.getCode(code)}</React.Fragment>
        );
    }
}
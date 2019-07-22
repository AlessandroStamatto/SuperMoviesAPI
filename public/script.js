const firebaseConfig = {
  apiKey: "AIzaSyB-QtASXSMzvx_qoUCll7OmDlvB16ZvP8k",
  authDomain: "superfilmesapi.firebaseapp.com",
  databaseURL: "https://superfilmesapi.firebaseio.com",
  projectId: "superfilmesapi",
  storageBucket: "superfilmesapi.appspot.com",
  messagingSenderId: "77316420348",
  appId: "1:77316420348:web:9cfcbcb68574729e"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

//Registrar por email e senha
document.getElementById("btnSignUp").addEventListener('click', e=>{
  const email = document.getElementById("txtEmail").value;
  const pass = document.getElementById("txtPassword").value;
  firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
   console.log(error.message);
  });
})

//Logar por email e senha
document.getElementById("btnLogin").addEventListener('click', e=>{
  const email = document.getElementById("txtEmail").value;
  const pass = document.getElementById("txtPassword").value;
  const promise = firebase.auth().signInWithEmailAndPassword(email, pass);
  promise.catch(e=>{ console.log(e.message)})
})

//Ao logar o botão de sair aparece
firebase.auth().onAuthStateChanged(user=>{ 
  if(user){
    document.getElementById("btnLogOut").classList.remove('hide')
  } else{
    document.getElementById("btnLogOut").classList.add('hide')
  }
})

//Ao sair o botão de sair desaparece
document.getElementById("btnLogOut").addEventListener('click', e=>{
  firebase.auth().signOut();
  console.log('logged out')
})
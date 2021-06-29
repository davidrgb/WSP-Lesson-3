export async function signIn(email, password) {
    await firebase.auth().signInWithEmailAndPassword(email, password);
}
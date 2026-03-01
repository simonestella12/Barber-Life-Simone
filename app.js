</main>

<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "INCOLLA",
  authDomain: "INCOLLA",
  projectId: "INCOLLA",
  storageBucket: "INCOLLA",
  messagingSenderId: "INCOLLA",
  appId: "INCOLLA"
};

const app = initializeApp(firebaseConfig);
window.db = getFirestore(app);
</script>

<script src="app.js"></script>
</body>
</html>

// All interfaces for MongoDB backend

// *** User ***//
export interface User {
  givenName: string;
  surName: string;
  email: string;
  password: string;
}

export interface Credentials { //τα διεπιστευτήρια ενός χρήστη, από αυτά εξαρτάται εάν θα γίνει logged in ή όχι
  email: string;
  password: string;
}

export interface LoggedInUser { //εδώ κρατάω την πληροφορία για τον User που μου στέλνει το backend δηλ το ποιός έχει κάνει Login (ποιος είναι)
  fullname: string;
  email: string;
  //δες final-project-angular-backend -> src -> user_blueprint.py
  //συγκεκριμένα το @user.route("/login", methods=["POST"])
  //εκεί βλέπω τι μου επιστρέφει το backend στο Login του user
}

//*** end of User ***//



//*** Customer ***//
//*** end of Customer ***//
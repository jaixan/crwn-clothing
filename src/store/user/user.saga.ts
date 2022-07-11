import { takeLatest, put, all, call } from "typed-redux-saga/macro";
import { USER_ACTION_TYPES } from "./user.types";
import { signInSuccess, signInFailed, signOutSuccess, SignUpStart } from "./user.action";
import { User } from 'firebase/auth';
import { EmailSignInStart } from './user.action';

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signinWithGooglePopup,
  signinWithFirebaseEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
  AdditionalInformation,
} from "../../utils/firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth: User, additionalDetails?: AdditionalInformation) {
  try {
    const userSnapshot = yield* call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );
    if (userSnapshot) {
      yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);

    if (!userAuth) return;
    yield* call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield* call(signinWithGooglePopup);
    yield* call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signInWithEmailAndPassword({ payload: { email, password } } : EmailSignInStart) {
  try {
    const userCredential = yield* call(
      signinWithFirebaseEmailAndPassword,
      email,
      password
    );

    if (userCredential) {
      const { user } = userCredential;
      yield* call(getSnapshotFromUserAuth, user);
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signUpWithEmailAndPassword({ payload: { email, password, displayName } } : SignUpStart) {
    try {
      const userCredentials = yield* call(
        createAuthUserWithEmailAndPassword,
        email,
        password
      );
      if (userCredentials) {
        const { user } = userCredentials;
        console.log(user);
        yield* call(getSnapshotFromUserAuth, user, {displayName});
      }
    } catch (error) {
      yield* put(signInFailed(error as Error));
    }
  }

export function* onGoogleSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield* takeLatest(
    USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
    signInWithEmailAndPassword
  );
}

export function* onSignUpStart() {
    yield* takeLatest(
        USER_ACTION_TYPES.SIGN_UP_START,
        signUpWithEmailAndPassword
    );
}

export function* signOut() {
    yield* call(signOutUser);
    yield* put(signOutSuccess());

}

export function* onSignOutStart() {
    yield* takeLatest(
        USER_ACTION_TYPES.SIGN_OUT_START,
        signOut
    );
}
export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignOutStart),
  ]);
}

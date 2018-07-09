import * as firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyA_BBlXq6ClyBTvJTJhLrYJo5moeULbqj8',
    authDomain: 'fifa-app-e3be5.firebaseapp.com',
    databaseURL: 'https://fifa-app-e3be5.firebaseio.com',
    projectId: 'fifa-app-e3be5',
    storageBucket: 'fifa-app-e3be5.appspot.com',
    messagingSenderId: '787701291965'
  };

  firebase.initializeApp(config);

  const database = firebase.database();
  const data: Data = {
      Groups: [],
      Info: {}
  };


  database.ref('/data/').once('value').then( snap => {
      data.Groups = snap.val().Groups;
      data.Info = snap.val().Info;
     console.log(snap.val());
  }).catch(err => {
      console.error('error while fetching data', err);
  });


  export default data;

  interface Data {
      Groups: Group[];
      Info: any;
  }

  interface Group {
      id: string;
      teams: string[];

  }

  interface Info {
      daily_count: number;
      grp_size: number;
      slots: string[];
      start_dt: string;
  }




const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const db = require('./models/databaseModels');

require('dotenv').config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      passReqToCallback: true,
    },
        function(request, accessToken, refreshToken, profile, done) {
          return done(null, profile);
        }));

    passport.serializeUser(function(user, done) {
      done(null, user);
    });

    passport.deserializeUser(function(user, done) {
      done(null, user);
    });
  

  //  function (request, accessToken, refreshToken, profile, done) {
  //     // console.log('profile from passportSetup', profile);


  //       const query = 'SELECT * FROM "user" WHERE user_id=' + 3456789666667;
  //       db.query(query)
  //         .then(data => {
  //           if (data.rows.length === 0) {
  //             const query =
  //             'INSERT INTO "user" (user_id, user_name, photo_url, first_name, last_name, email_address) VALUES ($1, $2, $3, $4, $5, $6) RETURNING user_id;';
  //             const data = [
  //               123456543,
  //               'Hermonie',
  //               'www.photo.com/afd/as',
  //               'hermonie',
  //               'potterrrr',
  //               'hpotterrr@gmail.com',
  //             ];
          
  //             db.query(query, data)
  //               .then(data => {
  //                 console.log('USERRRRRRRRRRR CREATED', data.rows);
  //               })
  //               done(null, profile)
  //             // console.log('User added with ID:', response.rows[0]);
  //           }
  //           console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZ',data.rows)
  //           done(null, profile);
  //         })
  //       // const response =  db.query(query);
  //       // console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZ',response.rows.length);
  //       done(null, profile);


      // findUser(profile.id).then((err, user) => {
      //   if (user) {
      //     // console.log('user exists', user)
      //     console.log(
      //       'profile.id from findUser function',
      //       findUser(profile.id)
      //     );
      //     return done(null, user);
      //   }
      // });
      // .then((err, user) => {
      //   if (user) {
      //     console.log('user exists', user);
      //     return done(null, user);
      // //   } else {
      // //     createUser();
      // //     console.log('added user to the db');
      // //     return done(null, user);
      // //   }
      // };
//     }
//   )
// );

// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function (user, done) {
//   findUser(),
//     function (err, user) {
//       if (err) return done(err);
//       done(null, user);
//     };
// });

async function createUser() {
  try {
    const query =
      'INSERT INTO "user" (user_id, user_name, photo_url, first_name, last_name, email_address) VALUES ($1, $2, $3, $4, $5, $6) RETURNING user_id;';
    data = [
      567866667,
      'Ron123',
      'www.photo.com/something/something',
      'Ronald',
      'Weasly',
      'ronweasly@gmail.com',
    ];

    const response = await db.query(query, data);
    console.log('User added with ID:', response.rows[0]);
  } catch (error) {
    console.log(error);
  }
}

async function findUser(id) {
  try {
    const query = 'SELECT * FROM "user" WHERE user_id=' + id;

    const response = await db.query(query);
    // console.log('response from findUser', response)
    return response.rows.length
      ? Promise.resolve(true)
      : Promise.reject();
  } catch (error) {
    console.log(error);
  }
}

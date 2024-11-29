// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const FacebookStrategy = require("passport-facebook").Strategy;
// const User = require("./models/User");
// const authConfig = require("./authConfig");

// // Google Strategy
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: authConfig.google.clientID,
//       clientSecret: authConfig.google.clientSecret,
//       callbackURL: authConfig.google.callbackURL,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         // Find or create user
//         let user = await User.findOne({ googleId: profile.id });

//         if (!user) {
//           user = new User({
//             googleId: profile.id,
//             email: profile.emails[0].value,
//             firstName: profile.name.givenName,
//             lastName: profile.name.familyName,
//             profilePicture: profile.photos[0].value,
//           });

//           await user.save();
//         }

//         return done(null, user);
//       } catch (error) {
//         return done(error, false);
//       }
//     }
//   )
// );

// // Facebook Strategy
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: authConfig.facebook.clientID,
//       clientSecret: authConfig.facebook.clientSecret,
//       callbackURL: authConfig.facebook.callbackURL,
//       profileFields: authConfig.facebook.profileFields,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         // Find or create user
//         let user = await User.findOne({ facebookId: profile.id });

//         if (!user) {
//           user = new User({
//             facebookId: profile.id,
//             email: profile.emails[0].value,
//             firstName: profile.name.givenName,
//             lastName: profile.name.familyName,
//             profilePicture: profile.photos[0].value,
//           });

//           await user.save();
//         }

//         return done(null, user);
//       } catch (error) {
//         return done(error, false);
//       }
//     }
//   )
// );

// // Serialize and Deserialize User
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (error) {
//     done(error, false);
//   }
// });

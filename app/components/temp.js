// export const appInitQuery = `#graphql
//   query appInitQuery {
//     currentAppInstallation {
//       id
//     }
//     themes(first: 1, roles: [MAIN]) {
//       nodes {
//         id
//         files(
//           filenames: ["config/settings_data.json"]
//           first: 1
//         ) {
//           nodes {
//             body {
//               ... on OnlineStoreThemeFileBodyText {
//                 content
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `

// import stripJsonComments from 'strip-json-comments';

// // Live Theme
//   const themeSettings = JSON.parse(stripJsonComments(themes.nodes[0].files.nodes[0].body.content));
//   const isAppEmbedEnabled = themeSettings.current.blocks && Object.values(themeSettings.current.blocks).some((b: any) => b.type.includes(`${process.env.APP_HANDLE}/blocks/redirects`) && !b.disabled);
//   const appEmbedEnableLink = `https://${session.shop}/admin/themes/current/editor?context=apps`;
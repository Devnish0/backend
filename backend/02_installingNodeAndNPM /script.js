const { log } = require("console");
const fs = require("fs");
// write file
// append file
// copy file
// rename
// unlink
// read file
// mkdir

function callback(err) {
  if (err) console.log(err);
  else console.log("file completed");
}

async function name(params) {
  const blob = await fetch("https://randomuser.me/api/");
  const data = await blob.json();
  const stringdata = JSON.stringify(data);
  return stringdata;
}

async function main(params) {
  const data = await name();
  //   // ? 1. writing in a file

  //   fs.writeFile("new.txt", await data, (err) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log("creating file done");
  //     }
  //   });

  //   //? 2. appending(likhe huye me add krna hai)

  //   fs.appendFile("new.txt", " ye dusri baar likha hai ji", (err) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log("append donw");
  //     }
  //   });

  //   //? 3. rename file

  //   fs.rename("new.txt", "wow.json", (err) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log("rename done");
  //     }
  //   });

  //   //  ? 4. unlink(delete)
  //   fs.unlink("./delete/del.js", (err) => {
  //     if (err) {
  //       console.log(err);
  //       //
  //       //
  //     } else {
  //       console.log("delete done");
  //       //
  //     }
  //   });
}
//? removing directory(empty bydefault)
// fs.rm("./delete", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("remo");
//   }
// });

//? we can copy the files via node modules

// fs.copyFile("text.txt", "./test/another.txt", (err) => {
//   if (err) console.log(err);
//   else console.log("copying done ");
// });

// fs.appendFile(
//   "./test/another.txt",
//   "hey there we hahe created this file with node",
//   (err) => {
//     if (err) console.log(err);
//     else console.log("completed");
//   }
// );

//? we can make folder via

// fs.mkdir("./test/nishank", callback);

//? we can read file as

fs.readFile("text.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  else console.log(data);
});

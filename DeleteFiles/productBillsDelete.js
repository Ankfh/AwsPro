const fs = require('fs');


exports.productBillsDelete = async(files)=>{
    if(files.length > 0){
        for(let i = 0; i< files.length; i++){
          fs.unlink(`${process.env.PRODUCT_BILLS_PATH}/${files[i]}`, (err) => {
            if (err) {
              console.error(err);
              return;
            }
          });
        }
      }
}
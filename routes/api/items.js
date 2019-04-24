const express = require('express');
const router = express.Router();
const item = require('../../models/item');

// get all items
router.get('/', (req, res)=>{
  item.find({}, (err, items)=>{
    if(err) throw err;
    
    res.json(items);

  }).sort({$date: -1});

})

// add a item
router.post('/', (req, res) =>{
  const newItem = new item(
    {name: req.body.name}
  );

  newItem.save((err, item)=>{
    if(err) throw err;

    if(item){
      res.json(item);
    }
  })
})

// delete a item
router.delete('/:id', (req, res) =>{
 Item.deleteOne({_id: req.params.id},(err, itemDeleted)=>{
    if(err) throw err;

    if(itemDeleted.deletedCount === 1){
      res.json({success: true, message: "Item deleted successfully."});
    }else{
      res.json({success: false, message: "Item not Exist."});
    }
  })
})

module.exports = router;
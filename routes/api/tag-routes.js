const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: ({ model: Product }),
    }); 
    res.json(tags);
  } catch (e) { 
    res.json(e);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagId = await Tag.findByPk(req.params.id, {
      include: ({ model: Product }),
    }); res.json (tagId);
  } catch (e) { 
    res.json(e);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  const { tag_name } = req.body;
  try {
    const newTag = await Tag.create({
      tag_name,
    });
    res.json(newTag);
  } catch (e) { 
    res.json(e);}
});


router.put('/:id', async (req, res) => {
  const { tag_name } = req.body;
  try {
    await Tag.update(
      {
        tag_name,
      },
      {
        where: { 
          id: req.params.id,
        }
      }
    );
    const updateTag = await Tag.findByPk(req.params.id);
    res.json(updateTag);
  } catch (e) { 
    res.json(e);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.findByPk(req.params.id);
    await Tag.destroy({ 
      where: { 
        id: req.params.id,
      }
    });
    res.json(deleteTag);
  } catch (e) {
    res.json(e);
  }
});


module.exports = router;

'use strict';
const _find = require('../../../utils/query');
const model = 'topic';

/**
 * A set of functions called "actions" for `Topic`
 */

module.exports = {

  /**
   * Get Topic entries.
   *
   * @return {Object|Array}
   */

  find: function * () {
    this.model = model;
  
    const {userid} =  this.query;
    try {
       
            const { page, size } = this.query;
            let entry = yield Topic.find({
                limit: page * size,
                sort: {
                    createdAt: 0
                },
                select: ['toAnswer', 'user', 'title']
            });
            this.body = yield strapi.hooks.blueprints.find(this);
        
    } catch (err) {
        this.body = err;
    }
  },
    findTopic: function * () {
        this.model = model;
        let isUser = false;
        let arr  = [];
        const {userid} = this.query
        let entry = yield strapi.hooks.blueprints.find(this);
        if(entry){
            (entry||[]).forEach((i,index)=>{
                if(i.stars&&i.stars.length>0){
                    i.stars.forEach((item)=>{
                        if(item.id === userid)
                            isUser = true
                            arr.push(i)
                    })
                }
            })
            if(!isUser){
                    arr = ""
            }
            this.body = arr;
        }
    },
  /**
   * Get a specific Topic.
   *
   * @return {Object|Array}
   */

  findOne: function * () {
    this.model = model;
    try {
      let entry = yield strapi.hooks.blueprints.findOne(this);
      this.body = entry;
    } catch (err) {
      this.body = err;
    }
  },

  /**
   * Create a Topic entry.
   *
   * @return {Object}
   */

  create: function * () {
    this.model = model;
    try {
      let entry = yield strapi.hooks.blueprints.create(this);
      this.body = entry;
    } catch (err) {
      this.body = err;
    }
  },

  /**
   * Update a Topic entry.
   *
   * @return {Object}
   */

  update: function * () {
    this.model = model;
    try {
      let entry = yield strapi.hooks.blueprints.update(this);
      this.body = entry;
    } catch (err) {
      this.body = err;
    }
  },

  /**
   * Destroy a Topic entry.
   *
   * @return {Object}
   */

  destroy: function * () {
    this.model = model;
    try {
      let entry = yield strapi.hooks.blueprints.destroy(this);
      this.body = entry;
    } catch (err) {
      this.body = err;
    }
  },

  /**
   * Add an entry to a specific Topic.
   *
   * @return {Object}
   */

  add: function * () {
    this.model = model;
    try {
      let entry = yield strapi.hooks.blueprints.add(this);
      this.body = entry;
    } catch (err) {
      this.body = err;
    }
  },

  /**
   * Remove a specific entry from a specific Topic.
   *
   * @return {Object}
   */

  remove: function * () {
    this.model = model;
    try {
      let entry = yield strapi.hooks.blueprints.remove(this);
      this.body = entry;
    } catch (err) {
      this.body = err;
    }
  }
};

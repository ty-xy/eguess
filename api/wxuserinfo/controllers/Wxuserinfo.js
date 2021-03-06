'use strict';

const model = 'wxuserinfo';

/**
 * A set of functions called "actions" for `Wxuserinfo`
 */

module.exports = {

  /**
   * Get Wxuserinfo entries.
   *
   * @return {Object|Array}
   */

  find: function * () {
    this.model = model;
    try {
      const isOpen =false;
      let entry,wxId;
      let userId;  
      let userUpdate = {};
        const  query  = this.query;
        // 检查是否有openid
        if(query.openid){
            entry = yield Wxuserinfo.findOne({openid:query.openid})
            console.log('Wxuserinfo是否存在', entry)
            if(entry === undefined){
                const updataUser={
                    username: `${Math.ceil(Math.random()*10000)}@eguess.com`,
                    nickName: query.nickname,
                    avatarUrl:query.avatarUrl,
                    email:`${Math.ceil(Math.random()*10000)}@eguess.com`,
                }
                //没有openid的时候创建一个新的user表
                let users = yield User.create(updataUser)
                console.log('User创建', entry)
                if(users){
                    const updateData = {
                        ...query,
                        wxUser:users.id
                    }
                    wxId = yield Wxuserinfo.create(updateData)
                    console.log('Wxuserinfo创建', wxId)
                    if(wxId){
                        const updataUsers ={
                            username: `${Math.ceil(Math.random()*10000)}@eguess.com`,
                            nickName: query.nickname,
                            email:`${Math.ceil(Math.random()*10000)}@eguess.com`,
                            wxUserInfo:wxId.id,
                        }
                        userUpdate = yield User.update({id:users.id},{...updataUsers})
                        console.log('user更新', userUpdate)
                    }
                }
                this.body = userUpdate[0];
            }else{
                const users = yield Wxuserinfo.update({id:entry.id},{query})
                console.log("Wxuserinfo存在，则更新user",users, users.wxUser)
                const _user = yield User.findOne({id: (users[0] && users[0].wxUser)})
                console.log('_user', _user)
                this.body = _user;
            }
        }else{
            this.body = {};
        }
      
    } catch (err) {
      this.body = err;
    }
  },

  /**
   * Get a specific Wxuserinfo.
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
   * Create a Wxuserinfo entry.
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
   * Update a Wxuserinfo entry.
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
   * Destroy a Wxuserinfo entry.
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
   * Add an entry to a specific Wxuserinfo.
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
   * Remove a specific entry from a specific Wxuserinfo.
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

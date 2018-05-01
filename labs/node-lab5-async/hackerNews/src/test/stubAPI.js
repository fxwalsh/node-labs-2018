import _ from 'lodash';

class StubAPI {

    constructor() {
        this.posts = [
            {  id: 1 ,
                title : 'India - Tiger population sees 30% increase.',
                link : 'http://www.bbc.com/news/world-asia-30896028',
                username : 'jbloggs',
                comments : [],
                upvotes : 10
            },
            { 
                id: 2,
                title : 'The button that is not.',
                link : 'http://blog.nuclearsecrecy.com/2014/12/15/button-isnt/',
                username : 'notme',
                comments : [],
                upvotes : 12
            },
            { 
                id: 3,
                title : 'Google Nears $1B Investment in SpaceX',
                link : null,
                username : 'notme',
                comments : [],
                upvotes : 12
            },
            { 
                id: 4,
                title : 'Coinbase Raises $75M from DFJ Growth, USAA, and More',
                link : 'http://blog.coinbase.com/post/108642362357/coinbase-raises-75m-from-dfj-growth-usaa-nyse',
                username : 'psmith',  
                comments : [],
                upvotes : 2
            }
        ] ;
    }

    getAll() {
        return this.posts ;
    }

    add(t,l) {
        var id = 1 ;
        var last = _.last(this.posts) ;
        if (last) {
            id = last.id + 1 ;
        }
        var len = this.posts.length ;
        var newL_len = this.posts.push({ 
            'id': id,  
            title: t, link : l, username: '', comments: [], upvotes: 0 }) ;
        return newL_len > len ;
    }

    upvote(id) {
        var index = _.findIndex(this.posts, 
            function(post) {
                return post.id === id;
            } );   
        if (index !== -1) {                 
            this.posts[index].upvotes += 1 ;
            return true ;
        }
        return false ;
    }

    getPost(id) {
        var result = null ;
        var index = _.findIndex(this.posts, function(post) {
            return post.id === id;
        } );     
        if (index !== -1) {                 
            result = this.posts[index];
        }
        return result ;
    }

    addComment(postId,c,n) {
        var post = this.getPost(postId ) ;
        var id = 1 ;
        var last = _.last(post.comments) ;
        if (last) {
            id = last.id + 1 ;
        }
        post.comments.push({ 'id': id,  
            comment: c , author: n, upvotes: 0 } ) ;
    }

    upvoteComment(postId,commentId) {
        var post = this.getPost(postId ) ;
        var index = _.findIndex(post.comments, function(c) {
            return c.id === commentId;
        } );  
        if (index !== -1) {                 
            post.comments[index].upvotes += 1 ;
        }

    }

}

export default (new StubAPI() );

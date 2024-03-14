class ApiFeatures{
    constructor(query,queryStr){
        // yhaan query h --> kya operation perform krwana h vo --> Product.find()
        // yhaan queryStr h --> konsi string/pattern search krna h
        this.query = query;//ye aab issi class ki property h jinko value assign hogyi h
        this.queryStr = queryStr;

    }

    search(){
        console.log("========== -- " + this.queryStr.keyword)
        const keyword = this.queryStr.keyword ? {
            // $or: The $or operator performs a logical OR operation on an array of two or more expressions. It selects the documents that satisfy at least one of the expressions.
            $or: [
                { name: { $regex: this.queryStr.keyword, $options: 'i' } }, // Case-insensitive name search
                { description: { $regex: this.queryStr.keyword, $options: 'i' } }, // Case-insensitive description search
              ],
            // name:{ //yhaan name bnana pdega ki jya dhundna h
            //     $regex: this.queryStr.keyword,
            //     $options: "i", // make case-insensitive
            // }
        }:{};
        console.log("From search() -- " + this.query)
        this.query = this.query.find({...keyword})
        console.log("From search() -- " + this.query)
        return this;//yhi class wapis se return krdi
    }
    filter(){
        
        console.log("From filter() -- " + this.query)
        // const queryCopy = this.queryStr;ye nhi kr skte kyunki Js k andr object by refrence pass hote h so agr isme chng kiye to original mein bhi honge thats not a good practice
        const queryCopy = {...this.queryStr};//this is shallow copy not refrence ab ye querycopy ek object h na ki ek string 
        // querycopy ek object h na ki ek string ..............(object ki shallow copy bn gyi taki reference na aaye) 
        const removeFileds = ["keyword","limit","page"]; // ye sabhi query parameters mein ye ignore krne k inka kuch kaam nhi h
        // how to remove:-
        removeFileds.forEach((key)=>{
            delete queryCopy[key] // used to remove a property(key) with a specific key from an object in JavaScript.
        })

        // filter for price & rating
        let queryStr = JSON.stringify(queryCopy);//object to string
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);
        this.query = this.query.find(JSON.parse(queryStr))//again string to object
        
        console.log("From filter() -- " + this.query)
        return this;
        // eg. isne kya kiya:- queryStr aayi= {price:{gt:'1200', lt:'2000'}} from &price[gt]=1200&price[lt]=2000 in url query
        // and we make it this :- {price:{'$gt':'1200', '$lt':'2000'}} so that we MongoDB can filter out range
        // here $gt, $lt are mongoDB operators


        // ab queryCopy mein sirf category wala rhega jo filter krna h
        // this.query = this.query.find((queryCopy))//ye case sensitive h kyunki hmm by default likh kr rhkenge na ki ye category h thats why
        // return this;
    }
    pagination(resultPerPage){
        
        console.log("From pagination() -- " + this.query)
        // this.queryStr.page ye ek string h so we have to change it in number Number(this.queryStr.page)
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage-1);

        this.query = this.query.limit(resultPerPage).skip(skip);
        // this.query-> saari product milegi then, limit(resultPerPage)-> ek time pr sirf resultPerPage jitni hee, then skip(skip)-> kitni skip krni h accorf=ding to current page number
        console.log("From pagination() -- " + this.query + "--" + resultPerPage + "--" + skip + "--")
        return this;

    }

}

module.exports = ApiFeatures;
from flask import Flask
import pickle
from flask_cors import CORS
from nltk.corpus import stopwords
import nltk,string
import nltk.data
from nltk.stem.porter import PorterStemmer
ps = PorterStemmer()



# Text Transformation Function :
def transform_text(text) :
    text = text.lower()  #Lower case
    
    text = nltk.word_tokenize(text)  #Word tokenize
    
    y = []  #Alpha-Numeric
    for i in text :
        if i.isalnum() :
            y.append(i)
            
            
    text = y[:]  #Stopwords and Punctuation
    y.clear()
    for i in text :
        if(i not in stopwords.words('english') and i not in string.punctuation) :
            y.append(i)
    
    text = y[:]
    y.clear()  #Stemming Words
    for i in text :
        y.append(ps.stem(i))
    
    return " ".join(y)

            



# Pickel Files :
tfidf = pickle.load(open("tfidf.pkl","rb"))
mnb_model = pickle.load(open("mnb.pkl","rb"))


# Flask App :
app = Flask(__name__)
CORS(app)



@app.route('/')
def hello():
    return "<h1>Spam SMS Classifier</h1>"


@app.route('/sms/<string:input_sms>',methods=['GET','POST'])
def movie(input_sms):
    transformed_sms = transform_text(input_sms)

    vector_input = tfidf.transform([transformed_sms])
    result = mnb_model.predict(vector_input)[0]

    if result == 1:
        sms_type = "Spam"
    else:
        sms_type = "Not Spam"

    return sms_type


if __name__ == '__main__':
    app.run(threaded=True, port=5000)
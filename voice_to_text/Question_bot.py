#pip install -r requirement.txt
# run the above command to install all required libraries
import streamlit as st
import PyPDF2 as pdf
import json
import os
from dotenv import load_dotenv
import google.generativeai as genai
import re
import jsonify
from voice import listen_once

load_dotenv()  # load all our environment variables

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))


def get_gemini_response(input_prompt):
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(input_prompt)
    return response.text


def get_response(question, answer):
    input_prompt_1 = """
       Hey there! Imagine you're a seasoned Senior Software Engineer with extensive knowledge in various domains such as software engineering, data science, data analysis, and big data engineering. Your role is to meticulously assess candidates during interviews by assigning a percentage score based on their responses. It's crucial to provide accurate evaluations without sending empty responses.

Question: {question}
Answer: {answer}

Here's an example of the desired output format:
{{
    Score: [45%]
}}

    """
    text=listen_once()

    response_1 = None
    while not response_1:
        response_1 = get_gemini_response(input_prompt_1.format(question=question, answer=text))
        percentage_match_1_match = re.search(r'\[([\d]+%)\]', response_1)
        if percentage_match_1_match:
            percentagematch = percentage_match_1_match.group(1)
        else:
            response_1 = None
    
    print(percentagematch)
    return percentagematch

get_response('''What is the difference between supervised and unsupervised learning?
''', '''Supervised learning involves training a model on a labeled dataset, where the correct output is provided. The model learns to map inputs to outputs based on the provided examples. In contrast, unsupervised learning deals with unlabeled data, where the model is tasked with finding patterns or structures within the data without explicit guidance.
''')

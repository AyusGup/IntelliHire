#pip install -r requirement.txt
# run the above command to install all required libraries
import streamlit as st
import PyPDF2 as pdf
import json
import os
from dotenv import load_dotenv
import google.generativeai as genai
import re

load_dotenv()  # load all our environment variables

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))


def get_gemini_response(input_prompt):
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(input_prompt)
    return response.text


def input_pdf_text(uploaded_file):
    reader = pdf.PdfReader(uploaded_file)
    text = ""
    for page in range(len(reader.pages)):
        page = reader.pages[page]
        text += str(page.extract_text())
    return text


def get_response(uploaded_file, jd):
    text = input_pdf_text(uploaded_file)
    input_prompt = """
    Hey Act Like a skilled or very experienced ATS (Application Tracking System)
    with a deep understanding of the tech field, software engineering, data science, data analyst
    and big data engineer. Your task is to evaluate the resume based on the given job description.
    You must consider the job market is very competitive and you should provide 
    the best assistance for improving the resumes.
    give me only result in format like in format like percentagematch:70%; missingkeyword: ; wordlength:;. 

    """
    
    response = get_gemini_response(input_prompt.format(text=text, jd=jd))
    print(response)
    key_value_pattern = r'(\w+)\s*:\s*([^;]+);'

    # Find all key-value pairs using regex
    matches = re.findall(key_value_pattern, response)

    # Format key-value pairs into JSON
    result = {}
    for key, value in matches:
        result[key.strip()] = value.strip()

    print(result)
    
    return result


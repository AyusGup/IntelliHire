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

    response_1 = None
    while not response_1:
        response_1 = get_gemini_response(input_prompt_1.format(question=question, answer=answer))
        percentage_match_1_match = re.search(r'\[([\d]+%)\]', response_1)
        if percentage_match_1_match:
            percentagematch = percentage_match_1_match.group(1)
        else:
            response_1 = None
    
    print(percentagematch)
    return percentagematch

text = '''
Minimum qualifications:

    Bachelor’s degree in Electrical, Electronics, Computer Engineering, Computer Science, or equivalent practical experience.
    10 years of experience with CPU engineering, CPU program management, or similar experience.
    Experience with modern processor micro-architecture and processor design flows, RTL, Design Simulation and Emulation, and Physical Design technologies.


Preferred qualifications:

    Master’s or PhD degree in Electrical, Electronics, Computer Engineering, Computer Science, or equivalent practical experience.
    Experience with industry standard CPU benchmarks, with knowledge of CPU PPA metrics and trade-offs.
    Experience with Google suite of applications (e.g., Google App Scripts, Sheets), and knowledge of modern project management tools (e.g., Confluence, JIRA).
    Experience interacting with global teams and excellent communication skills.
    Knowledge of up-to-date ARM Instruction Set Architecture.

About the job
Google's mission is to organize the world's information and make it universally accessible and useful. Our Devices & Services team combines the best of Google AI, Software, and Hardware to create radically helpful experiences for users. We research, design, and develop new technologies and hardware to make our user's interaction with computing faster, seamless, and more powerful. Whether finding new ways to capture and sense the world around us, advancing form factors, or improving interaction methods, the Devices & Services team is making people's lives better through technology.
Responsibilities

    Drive inter-discipline discussions at the project level. Coordinate among CPU Architecture, Performance, Design, Design Verification, Emulation, Physical Design, and support teams. 
    Coordinate regular Engineering and Management meetings at various levels and across multiple geographical locations, and ensure smooth operation of well-functioning programs.
    Host issue and resolution meetings at the project level, and create and track issues. 
    Ensure programs are executed for quality and schedule.
'''

get_response('''What is the difference between supervised and unsupervised learning?
''', '''Supervised learning involves training a model on a labeled dataset, where the correct output is provided. The model learns to map inputs to outputs based on the provided examples. In contrast, unsupervised learning deals with unlabeled data, where the model is tasked with finding patterns or structures within the data without explicit guidance.
''')

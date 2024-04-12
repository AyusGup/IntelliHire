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


def input_pdf_text(uploaded_file):
    reader = pdf.PdfReader(uploaded_file)
    text = ""
    for page in range(len(reader.pages)):
        page = reader.pages[page]
        text += str(page.extract_text())
    return text


def get_response(uploaded_file, jd):
    text = input_pdf_text(uploaded_file)
    input_prompt_1 = """
       Hey Act Like a skilled or very experienced ATS (Application Tracking System)
    with a deep understanding of the tech field, software engineering, data science, data analyst
    and big data engineer. Your task is to evaluate the resume based on the given job description.
    You must consider the job market is very competitive and you should provide 
    the best assistance for improving the resumes. Assign the percentage Matching based 
    on JD with high accuracy.IT IS IMPORTANT TO NOTE THAT YOU DON'T SEND EMPTY [] IN RESPONSE.
    resume:{text}
    description:{jd}

    I want output like following example:
    {{
    Percentage_match:[45%]
    }}

    """

    response_1 = None
    while not response_1:
        response_1 = get_gemini_response(input_prompt_1.format(text=text, jd=jd))
        percentage_match_1_match = re.search(r'\[([\d]+%)\]', response_1)
        if percentage_match_1_match:
            percentagematch = percentage_match_1_match.group(1)
        else:
            response_1 = None

    input_prompt_2 = """
       Hey Act Like a skilled or very experienced ATS (Application Tracking System)
    with a deep understanding of the tech field, software engineering, data science, data analyst
    and big data engineer. Your task is to evaluate the resume based on the given job description.
    You must consider the job market is very competitive and you should provide 
    the best assistance for improving the resumes.Provide a list on missing keywords in resume as compared to JD with high accuracy.
    IT IS IMPORTANT TO NOTE THAT YOU DON'T SEND EMPTY [] IN RESPONSE.

    resume:{text}
    description:{jd}

    I want output like following example:
    {{
    Missing_keyword:[docker,node.js,php,5 year experience, Master's Degree,Phd,computer science,communication skill,spoken skills]
    }}

    """
    response_2 = None
    while not response_2:
        response_2 = get_gemini_response(input_prompt_2.format(text=text, jd=jd))
        percentage_match_2_match = re.search(r'\[(.*?)\]', response_2)
        if percentage_match_2_match and percentage_match_2_match.group(1):
            missingkeyword = percentage_match_2_match.group(1)
        else:
            response_2 = None

    input_prompt_3 = """
       Hey Act Like a skilled or very experienced ATS (Application Tracking System)
    with a deep understanding of the tech field, software engineering, data science, data analyst
    and big data engineer. Your task is to evaluate the resume based on the given job description.
    You must consider the job market is very competitive and you should provide 
    the best assistance for improving the resumes. Provide a brief description of resume in contrast to JD with high accuracy in 100 words
    including resume's positive and negative points and how can candidate improve his resume.
    IT IS IMPORTANT TO NOTE THAT YOU DON'T SEND EMPTY [] IN RESPONSE.
    resume:{text}
    description:{jd}

    I want output like following example:
    {{
    Resume_description:[This software engineer possesses a robust skill set with strengths in various programming languages such as Python, 
    Java, and C++, coupled with extensive experience in full-stack web development utilizing frameworks like React and Django. 
    Their track record showcases timely delivery of high-quality software solutions, reflecting strong problem-solving abilities 
    and adaptability within collaborative environments. However, areas for growth include limited exposure to mobile app development 
    and cloud computing platforms like AWS or Azure. To enhance their profile, the engineer should consider engaging in mobile app projects, 
    upskilling in cloud computing, and honing soft skills like communication and leadership for improved client interaction and project 
    management capabilities.]
    }}

    """

    response_3 = None
    while not response_3:
        response_3 = get_gemini_response(input_prompt_3.format(text=text, jd=jd))
        match = re.search(r'\[(.*?)\]', response_3)
        if match:
            Description = match.group(1)
        else:
            response_3 = None
    mydict={
            "percentagematch":percentagematch,
            "missingkeyword":missingkeyword,
            "Description":Description
            }
    
    output=json.dumps(mydict)
    return output

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

get_response("Ayush's Resume.pdf", text)

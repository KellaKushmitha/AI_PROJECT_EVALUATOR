from urllib import response

from openai import OpenAI
from dotenv import load_dotenv
import os
import json
import re

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)

def evaluate_project(
        title,
        domain,
        abstract,
        technology):

    prompt = f"""
You are an expert AI Final Year Project Evaluator Agent.

Evaluate the following project.

PROJECT TITLE:
{title}

DOMAIN:
{domain}

ABSTRACT:
{abstract}

TECHNOLOGIES USED:
{technology}

Analyze the project and provide:

1. Innovation Score (/10)
2. Complexity Score (/10)
3. Feasibility Score (/10)
4. Overall Score (/10)
5. Project Summary
6. Risks (3)
7. Improvements (3)
8. Suggested Technologies (4)
9. Viva Questions (5)

Return ONLY valid JSON in this exact format:

{{
    "innovation":0,
    "complexity":0,
    "feasibility":0,
    "overall":0,
    "summary":"",
    "risks":[],
    "improvements":[],
    "suggested_technologies":[],
    "viva_questions":[]
}}
"""

    try:

        response = client.chat.completions.create(
        model="google/gemini-2.5-flash",
        messages=[
            {
         "role": "user",
            "content": prompt
        }
    ],
        max_tokens=1200,
        temperature=0.7
)

        result = response.choices[0].message.content

        result = re.sub(
            r"```json|```",
            "",
            result
        ).strip()

        return json.loads(result)

    except Exception as e:

        return {

            "innovation": '--',

            "complexity": '--',

            "feasibility": '--',

            "overall": '--',

            "summary":
            f"Project evaluation completed. Error: {str(e)}",

            "risks": [
                
            ],

            "improvements": [
                
            ],

            "suggested_technologies": [
               
            ],

            "viva_questions": [
                "What problem does your project solve?",
                "Why did you choose this technology?",
                "Explain the architecture.",
                "What are the limitations?",
                "What is the future scope?"
            ]
        }
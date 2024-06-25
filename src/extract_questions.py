import PyPDF2
import json
import re

# Function to extract text from PDF
def extract_text_from_pdf(pdf_path):
    pdf_file = open(pdf_path, 'rb')
    pdf_reader = PyPDF2.PdfReader(pdf_file)

    text = ''
    for page_num in range(len(pdf_reader.pages)):
        page = pdf_reader.pages[page_num]
        text += page.extract_text()

    pdf_file.close()
    return text

# Function to parse text into questions and answers
def parse_text_to_qa(text):
    qa_list = []
    # Example pattern: Split by question numbers (assuming they are followed by a dot and a space)
    questions = re.split(r'\d+\.\s', text)[1:]  # Skip the first empty element
    for question in questions:
        parts = question.strip().split('\n')
        question_text = parts[0].strip()
        answers = [part.strip() for part in parts[1:5]]  # Assuming each question has 4 answers
        correct_answer = parts[5].strip() if len(parts) > 5 else None  # Assuming the correct answer is provided separately
        qa_list.append({
            "question": question_text,
            "answers": answers,
            "correct_answer": correct_answer
        })
    return qa_list

# Function to save data to JSON file
def save_to_json(data, json_path):
    with open(json_path, 'w', encoding='utf-8') as json_file:
        json.dump(data, json_file, indent=4, ensure_ascii=False)

# Main Function
def main():
    pdf_path = 'fragenkatalog.pdf'
    json_path = 'questions.json'

    # Extract text from PDF
    text = extract_text_from_pdf(pdf_path)

    # Print extracted text (for debugging purposes)
    print(text)

    # Parse text into questions and answers
    questions = parse_text_to_qa(text)

    # Save to JSON
    save_to_json(questions, json_path)

if __name__ == '__main__':
    main()

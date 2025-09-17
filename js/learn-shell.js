// Learn Shell Scripting Interactive Functionality

class ShellLearning {
    constructor() {
        this.completedSections = JSON.parse(localStorage.getItem('shellProgress')) || [];
        this.init();
    }

    init() {
        this.updateProgress();
        this.updateSectionStatuses();
        this.initCodeHighlighting();
    }

    // Update overall progress
    updateProgress() {
        const totalSections = 4; // basics, variables, control, functions
        const completedCount = this.completedSections.length;
        const progressPercentage = (completedCount / totalSections) * 100;
        
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        if (progressFill && progressText) {
            progressFill.style.width = `${progressPercentage}%`;
            progressText.textContent = `${Math.round(progressPercentage)}% Complete`;
        }
    }

    // Update section completion status
    updateSectionStatuses() {
        const sections = ['basics', 'variables', 'control', 'functions'];
        
        sections.forEach(section => {
            const statusElement = document.querySelector(`[data-section="${section}"]`);
            if (statusElement) {
                const icon = statusElement.querySelector('.status-icon');
                const text = statusElement.querySelector('.status-text');
                
                if (this.completedSections.includes(section)) {
                    icon.textContent = '✓';
                    icon.classList.add('completed');
                    text.textContent = 'Completed';
                    text.style.color = '#50fa7b';
                } else {
                    icon.textContent = '○';
                    icon.classList.remove('completed', 'in-progress');
                    text.textContent = 'Not Started';
                    text.style.color = 'var(--text-color-muted)';
                }
            }
        });
    }

    // Mark section as completed
    completeSection(sectionId) {
        if (!this.completedSections.includes(sectionId)) {
            this.completedSections.push(sectionId);
            localStorage.setItem('shellProgress', JSON.stringify(this.completedSections));
            this.updateProgress();
            this.updateSectionStatuses();
        }
    }

    // Initialize code highlighting
    initCodeHighlighting() {
        if (typeof Prism !== 'undefined') {
            Prism.highlightAll();
        }
    }
}

// Code execution simulator
const codeExamples = {
    'basics-1': {
        code: `#!/bin/bash
# This is a comment
echo "Hello, World!"
echo "Welcome to shell scripting!"`,
        output: [
            "Hello, World!",
            "Welcome to shell scripting!"
        ]
    },
    'variables-1': {
        code: `#!/bin/bash
# Variable assignment (no spaces around =)
name="John Doe"
age=25
today=$(date +%Y-%m-%d)

echo "Name: $name"
echo "Age: $age"
echo "Today is: $today"

# Reading user input
echo "What's your favorite color?"
read color
echo "Your favorite color is: $color"`,
        output: [
            "Name: John Doe",
            "Age: 25",
            "Today is: " + new Date().toISOString().split('T')[0],
            "What's your favorite color?",
            "> blue", // Simulated user input
            "Your favorite color is: blue"
        ]
    },
    'control-1': {
        code: `#!/bin/bash
# If statement
echo "Enter a number:"
read number

if [ $number -gt 10 ]; then
    echo "Number is greater than 10"
elif [ $number -eq 10 ]; then
    echo "Number is exactly 10"
else
    echo "Number is less than 10"
fi

# For loop
echo "Counting from 1 to 5:"
for i in {1..5}; do
    echo "Count: $i"
done

# While loop
echo "Countdown:"
count=3
while [ $count -gt 0 ]; do
    echo "$count..."
    count=$((count - 1))
done
echo "Done!"`,
        output: [
            "Enter a number:",
            "> 15", // Simulated user input
            "Number is greater than 10",
            "Counting from 1 to 5:",
            "Count: 1",
            "Count: 2",
            "Count: 3",
            "Count: 4",
            "Count: 5",
            "Countdown:",
            "3...",
            "2...",
            "1...",
            "Done!"
        ]
    },
    'functions-1': {
        code: `#!/bin/bash
# Function definition
greet() {
    local name=$1
    echo "Hello, $name! Welcome to shell scripting."
}

# Function with return value
add_numbers() {
    local num1=$1
    local num2=$2
    local result=$((num1 + num2))
    echo $result
}

# Using functions
greet "Alice"
result=$(add_numbers 15 25)
echo "15 + 25 = $result"

# File operations
echo "Creating a test file..."
echo "This is a test file" > test.txt
echo "File contents:"
cat test.txt

# Check if file exists
if [ -f "test.txt" ]; then
    echo "test.txt exists!"
    echo "File size: $(wc -c < test.txt) bytes"
fi`,
        output: [
            "Hello, Alice! Welcome to shell scripting.",
            "15 + 25 = 40",
            "Creating a test file...",
            "File contents:",
            "This is a test file",
            "test.txt exists!",
            "File size: 20 bytes"
        ]
    }
};

// Exercise solutions and validation
const exerciseSolutions = {
    'exercise-1': {
        section: 'basics',
        keywords: ['echo', 'name', 'date'],
        validate: (code) => {
            const hasEcho = code.includes('echo');
            const hasName = code.toLowerCase().includes('name') || code.includes('$');
            const hasDate = code.includes('date') || code.includes('$(date');
            return hasEcho && hasName;
        },
        hint: "Use 'echo' to display text and consider using variables or the 'date' command."
    },
    'exercise-2': {
        section: 'variables',
        keywords: ['read', 'echo', '+', '$(('],
        validate: (code) => {
            const hasRead = code.includes('read');
            const hasEcho = code.includes('echo');
            const hasArithmetic = code.includes('$((') || code.includes('expr');
            return hasRead && hasEcho && hasArithmetic;
        },
        hint: "Use 'read' to get input, store in variables, and use $(()) for arithmetic."
    },
    'exercise-3': {
        section: 'control',
        keywords: ['if', 'elif', 'then', 'fi', 'read'],
        validate: (code) => {
            const hasIf = code.includes('if');
            const hasElif = code.includes('elif') || code.includes('else');
            const hasThen = code.includes('then');
            const hasFi = code.includes('fi');
            return hasIf && hasThen && hasFi;
        },
        hint: "Use if-elif-else statements to check grade ranges (90+, 80+, 70+, 60+, below 60)."
    },
    'exercise-4': {
        section: 'functions',
        keywords: ['function', '()', 'cp', 'date', 'local'],
        validate: (code) => {
            const hasFunction = code.includes('()') || code.includes('function');
            const hasCopy = code.includes('cp') || code.includes('backup');
            const hasDate = code.includes('date') || code.includes('timestamp');
            return hasFunction && (hasCopy || hasDate);
        },
        hint: "Create a function that takes a filename and copies it with a timestamp suffix."
    }
};

// Run code simulation
function runCode(exampleId) {
    const outputContainer = document.getElementById(`output-${exampleId}`);
    const example = codeExamples[exampleId];
    
    if (!outputContainer || !example) return;
    
    outputContainer.innerHTML = '';
    outputContainer.classList.add('visible');
    
    // Simulate typing effect
    let lineIndex = 0;
    const typeNextLine = () => {
        if (lineIndex < example.output.length) {
            const line = example.output[lineIndex];
            const lineElement = document.createElement('div');
            lineElement.className = 'output-line';
            
            if (line.startsWith('>')) {
                lineElement.className += ' input-line';
            }
            
            lineElement.textContent = line;
            outputContainer.appendChild(lineElement);
            
            lineIndex++;
            setTimeout(typeNextLine, 500);
        }
    };
    
    setTimeout(typeNextLine, 100);
}

// Check exercise solution
function checkExercise(exerciseId, sectionId) {
    const textarea = document.getElementById(exerciseId);
    const feedback = document.getElementById(`feedback-${exerciseId}`);
    const solution = exerciseSolutions[exerciseId];
    
    if (!textarea || !feedback || !solution) return;
    
    const userCode = textarea.value.toLowerCase().trim();
    
    if (userCode.length < 10) {
        showFeedback(feedback, false, "Please write some code to solve the exercise.");
        return;
    }
    
    const isValid = solution.validate(userCode);
    
    if (isValid) {
        showFeedback(feedback, true, "Great job! Your solution looks correct. You've completed this exercise!");
        shellLearning.completeSection(sectionId);
    } else {
        showFeedback(feedback, false, `Not quite right. ${solution.hint}`);
    }
}

// Show exercise feedback
function showFeedback(feedbackElement, isCorrect, message) {
    feedbackElement.className = `exercise-feedback visible ${isCorrect ? 'correct' : 'incorrect'}`;
    feedbackElement.textContent = message;
    
    // Add animation
    feedbackElement.classList.add('fade-in');
    setTimeout(() => feedbackElement.classList.remove('fade-in'), 500);
}

// Initialize when page loads
let shellLearning;
document.addEventListener('DOMContentLoaded', () => {
    shellLearning = new ShellLearning();
});

// Smooth scrolling for section navigation
document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers for section headers to make them expandable/collapsible
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.style.cursor = 'pointer';
        header.addEventListener('click', () => {
            const section = header.parentElement;
            const content = section.querySelector('.lesson-content');
            
            if (content.style.display === 'none') {
                content.style.display = 'block';
                content.classList.add('fade-in');
            }
        });
    });
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl + Enter to run code in focused textarea
    if (e.ctrlKey && e.key === 'Enter') {
        const focused = document.activeElement;
        if (focused.classList.contains('code-input')) {
            const exerciseId = focused.id;
            const section = exerciseId.split('-')[1];
            const sectionMap = {
                '1': 'basics',
                '2': 'variables', 
                '3': 'control',
                '4': 'functions'
            };
            checkExercise(exerciseId, sectionMap[section]);
        }
    }
});

// Export for global access
window.runCode = runCode;
window.checkExercise = checkExercise;
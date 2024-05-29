// URL to your hosted CSV file on GitHub
const csvUrl = 'https://raw.githubusercontent.com/MatthewBHShort/EnergyCoaching/main/answers.csv';

// Function to fetch and parse the CSV file
async function fetchAndParseCSV(url) {
  const response = await fetch(url);
  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}

const driver = "";

// Function to prompt for a letter and get the corresponding CSV data
async function askForLetter(stringAnswer) {
  try {
    const csvData = await fetchAndParseCSV(csvUrl);

   
    // console.log('CSV Data:', csvData);

    
    const letter = removeRepeatingCharacters(stringAnswer);
    // const letter = "AB";
    console.log(stringAnswer + "    ->    " + letter)


    function removeRepeatingCharacters(str) {
        return Array.from(new Set(str)).join('');
      }    

    fullResult = "";
    for(let i = 0; i < letter.length; i++){
        // console.log("Iteration: " + i);
        result = csvData.find(row => row.identifier && row.identifier.toLowerCase() === letter[i].toLowerCase());
        // console.log(result);
        fullResult += result.paragraph;
        fullResult += "\n\n\n\n\n\n";
    }
    // console.log("Full Result: " + fullResult)
    if (result) {
       document.getElementById('result').innerText = `Based on your specifications, we recommend the following: \n\n` + fullResult;


        // console.log("full restuls \n" + fullResult);
        // const container = document.getElementById('content');
        // // document.getElementById('content').innerHTML = container;
        // const formattedText = formatText(fullResult);
        // container.appendChild(formattedText);

        // // document.getElementById("myDiv").innerHTML = myString;



    } else {
      document.getElementById('result').innerText = `No paragraph found for ${letter}`;
    }
  } catch (error) {
    console.error('Error fetching or parsing CSV:', error);
    document.getElementById('result').innerText = 'Error fetching or parsing CSV. Check the console for details.';
  }
}


const questions = {
    start: {
        question: "What is your driver?",
        answers: {
            "Reducing Costs": { next: "ductWork", action: () => result.driver += "costs"},
            "Reducing GHGs": { next: "ductWork", action: () => result.driver += "ghgs"},
            "Thermal Comfort": { next: "ductWork", action: () => result.driver += "comfort"},
            "Equipment at End of Life": { next: "ductWork", action: () => result.driver += "equipment"},
        }
    },
    ductWork: {
        question: "Does your home have duct work?",
        answers: {
            "Yes": { next: "furnaceType" },
            "No": { next: "hydronicHeating" },
            "I don't know": { next: "virtualConsultation"},
        }
    },
    furnaceType: {
        question: "Do you have a gas/propane/oil/wood furnace?",
        answers: {
            "Yes": { next: "furnaceAge" },
            "No": { next: "ductedHeatPump" },
            "I don't know": { next: "virtualConsultation"},
        }
    },
    furnaceAge: {
        question: "What is the age of your furnace?",
        answers: {
            "0 - 5 years": { 
                next: "AC", 
                    action: () => {
                        switch (result.driver) {
                            case 'costs':
                                result.answerString += "EF";
                                break;
                            case 'ghgs':
                                result.answerString += "EF";
                                break;
                            case 'comfort':
                                    result.answerString += "F";
                                    break;
                            case 'equipment':
                                    result.answerString += "";
                                    break;
                        }
                    }
            },
            "6 - 10 years": { 
                next: "AC",
                action: () => {
                    switch (result.driver) {
                        case 'costs':
                            result.answerString += "EF";
                            break;
                        case 'ghgs':
                            result.answerString += "EF";
                            break;
                        case 'comfort':
                                result.answerString += "F";
                                break;
                        case 'equipment':
                                result.answerString += "";
                                break;
                    }
                }
            },
            "11 - 15 years": { 
                next: "AC", 
                action: () => {
                    switch (result.driver) {
                        case 'costs':
                            result.answerString += "EFM";
                            break;
                        case 'ghgs':
                            result.answerString += "EFM";
                            break;
                        case 'comfort':
                                result.answerString += "EFM";
                                break;
                        case 'equipment':
                                result.answerString += "EFM";
                                break;
                    }
                }
            },
            "16+ years": { 
                next: "AC", 
                action: () => {
                    switch (result.driver) {
                        case 'costs':
                            result.answerString += "EFMZ";
                            break;
                        case 'ghgs':
                            result.answerString += "EFMZ";
                            break;
                        case 'comfort':
                                result.answerString += "EFMZ";
                                break;
                        case 'equipment':
                                result.answerString += "EFMZ";
                                break;
                    }
            }
        }
    }
    },

    AC: {
        question: "Does your home have Air Conditioning?",
        answers: {
            "Yes": { next: "ACAge" },
            "No": { next: "end" },
            "I don't know": { next: "virutalConsultation"},
        }
    },
    ACAge: {
        question: "What is the age of your Air Conditioner?",
        answers: {
            "0 - 5 years": { 
                next: "end", 
                    action: () => {
                        switch (result.driver) {
                            case 'costs':
                                result.answerString += "EF";
                                break;
                            case 'ghgs':
                                result.answerString += "EF";
                                break;
                            case 'comfort':
                                    result.answerString += "F";
                                    break;
                            case 'equipment':
                                    result.answerString += "";
                                    break;
                        }
                    }
            },
            "6 - 10 years": { 
                next: "end",
                action: () => {
                    switch (result.driver) {
                        case 'costs':
                            result.answerString += "EF";
                            break;
                        case 'ghgs':
                            result.answerString += "EF";
                            break;
                        case 'comfort':
                                result.answerString += "F";
                                break;
                        case 'equipment':
                                result.answerString += "";
                                break;
                    }
                }
            },
            "11 - 15 years": { 
                next: "end", 
                action: () => {
                    switch (result.driver) {
                        case 'costs':
                            result.answerString += "EF";
                            break;
                        case 'ghgs':
                            result.answerString += "EF";
                            break;
                        case 'comfort':
                                result.answerString += "F";
                                break;
                        case 'equipment':
                                result.answerString += "";
                                break;
                    }
                }
            },
            "16+ years": { 
                next: "end", 
                action: () => {
                    switch (result.driver) {
                        case 'costs':
                            result.answerString += "EFP";
                            break;
                        case 'ghgs':
                            result.answerString += "EFP";
                            break;
                        case 'comfort':
                                result.answerString += "EFP";
                                break;
                        case 'equipment':
                                result.answerString += "EFP";
                                break;
                    }
            }
        }
    }
    },

    ductedHeatPumpAge: {
        question: "What is the age of your ducted heat pump?",
        answers: {
            "0 - 5 years": { 
                next: "AC", 
                    action: () => {
                        switch (result.driver) {
                            case 'costs':
                                result.answerString += "H";
                                break;
                            case 'ghgs':
                                result.answerString += "H";
                                break;
                            case 'comfort':
                                    result.answerString += "H";
                                    break;
                            case 'equipment':
                                    result.answerString += "";
                                    break;
                        }
                    }
            },
            "6 - 10 years": { 
                next: "AC",
                action: () => {
                    switch (result.driver) {
                        case 'costs':
                            result.answerString += "H";
                            break;
                        case 'ghgs':
                            result.answerString += "H";
                            break;
                        case 'comfort':
                                result.answerString += "H";
                                break;
                        case 'equipment':
                                result.answerString += "";
                                break;
                    }
                }
            },
            "11 - 15 years": { 
                next: "AC", 
                action: () => {
                    switch (result.driver) {
                        case 'costs':
                            result.answerString += "H";
                            break;
                        case 'ghgs':
                            result.answerString += "H";
                            break;
                        case 'comfort':
                                result.answerString += "H";
                                break;
                        case 'equipment':
                                result.answerString += "";
                                break;
                    }
                }
            },
            "16+ years": { 
                next: "AC", 
                action: () => {
                    switch (result.driver) {
                        case 'costs':
                            result.answerString += "HMZ";
                            break;
                        case 'ghgs':
                            result.answerString += "HMZ";
                            break;
                        case 'comfort':
                                result.answerString += "HMZ";
                                break;
                        case 'equipment':
                                result.answerString += "HMZ";
                                break;
                    }
            }
        }
    }
    },
    ductlessHeatPumpAge: {
        question: "What is the age of your ductless heat pump?",
        answers: {
            "0 - 5 years": { 
                next: "end", 
                    action: () => {
                        switch (result.driver) {
                            case 'costs':
                                result.answerString += "EH";
                                break;
                            case 'ghgs':
                                result.answerString += "EH";
                                break;
                            case 'comfort':
                                    result.answerString += "H";
                                    break;
                            case 'equipment':
                                    result.answerString += "";
                                    break;
                        }
                    }
            },
            "6 - 10 years": { 
                next: "end",
                action: () => {
                    switch (result.driver) {
                        case 'costs':
                            result.answerString += "EH";
                            break;
                        case 'ghgs':
                            result.answerString += "EH";
                            break;
                        case 'comfort':
                                result.answerString += "H";
                                break;
                        case 'equipment':
                                result.answerString += "";
                                break;
                    }
                }
            },
            "11 - 15 years": { 
                next: "end", 
                action: () => {
                    switch (result.driver) {
                        case 'costs':
                            result.answerString += "EH";
                            break;
                        case 'ghgs':
                            result.answerString += "EH";
                            break;
                        case 'comfort':
                                result.answerString += "H";
                                break;
                        case 'equipment':
                                result.answerString += "";
                                break;
                    }
                }
            },
            "16+ years": { 
                next: "end", 
                action: () => {
                    switch (result.driver) {
                        case 'costs':
                            result.answerString += "EHOZ";
                            break;
                        case 'ghgs':
                            result.answerString += "EHOZ";
                            break;
                        case 'comfort':
                                result.answerString += "EHOZ";
                                break;
                        case 'equipment':
                                result.answerString += "EHOZ";
                                break;
                    }
            }
        }
    }
    },
    ductedHeatPump: {
        question: "Does your home have a ducted heat pump?",
        answers: {
            "Yes": { next: "ductedHeatPumpAge" },
            "No": { next: "virtualConsultaion" },
            "I don't know": { next: "virutalConsultation"},
        }
    },
    hydronicHeating: {
        question: "Does your home have hot water radiators/in-floor?",
        answers: {
            "Yes": { next: "boiler" },
            "No": { next: "baseboard" },
            "I don't know": { next: "virutalConsultation"},
        }
    },
    baseboard: {
        question: "Does your home have electric baseboard heating?",
        answers: {
            "Yes": { next: "end" },
            "No": { next: "ductlessHeatPump" },
            "I don't know": { next: "virtualConsultation"},
        }
    },
    ductlessHeatPump: {
        question: "Does your home have a ductless heat pump?",
        answers: {
            "Yes": { next: "ductlessHeatPumpAge" },
            "No": { next: "virtualConsultation" },
            "I don't know": { next: "virtualConsultation"},
        }
    },
    boiler: {
        question: "Does your home have gas/propane/oil/wood boiler",
        answers: {
            "Yes": { next: "boilerAge" },
            "No": { next: "end" },
            "I don't know": { next: "virutalConsultation"},
        }
    },
    boilerAge: {
        question: "What is the age of your boiler?",
        answers: {
            "0 - 5 years": { 
                next: "end", 
                    action: () => {
                        switch (result.driver) {
                            case 'costs':
                                result.answerString += "EG";
                                break;
                            case 'ghgs':
                                result.answerString += "EG";
                                break;
                            case 'comfort':
                                    result.answerString += "G";
                                    break;
                            case 'equipment':
                                    result.answerString += "";
                                    break;
                        }
                    }
            },
            "6 - 10 years": { 
                next: "end",
                action: () => {
                    switch (result.driver) {
                        case 'costs':
                            result.answerString += "EG";
                            break;
                        case 'ghgs':
                            result.answerString += "EG";
                            break;
                        case 'comfort':
                                result.answerString += "G";
                                break;
                        case 'equipment':
                                result.answerString += "";
                                break;
                    }
                }
            },
            "11 - 15 years": { 
                next: "end", 
                action: () => {
                    switch (result.driver) {
                        case 'costs':
                            result.answerString += "EG";
                            break;
                        case 'ghgs':
                            result.answerString += "EG";
                            break;
                        case 'comfort':
                                result.answerString += "G";
                                break;
                        case 'equipment':
                                result.answerString += "";
                                break;
                    }
                }
            },
            "16+ years": { 
                next: "end", 
                action: () => {
                    switch (result.driver) {
                        case 'costs':
                            result.answerString += "EGNZ";
                            break;
                        case 'ghgs':
                            result.answerString += "EGNZ";
                            break;
                        case 'comfort':
                                result.answerString += "EGNZ";
                                break;
                        case 'equipment':
                                result.answerString += "EGNZ";
                                break;
                    }
            }
        }
    }
    },

    virtualConsultation: {
        question: "Would you like to book a virtual consultation?",
        answers: {
            "Yes": { next: "end"},
            "No": { next: "end"},
        }
    },
    
    
    end: {
        question: "Would you like to save your responses?"
    }
};
            
let current = "start";
let result = {
    answerString: "",
    driver: ""
};
let responses = [];

function askQuestion() {
    const q = questions[current];
    const questionElem = document.getElementById('question');
    const answersElem = document.getElementById('answers');

    questionElem.innerText = q.question;
    answersElem.innerHTML = '';

    for (let answer in q.answers) {
        const button = document.createElement('button');
        button.innerText = answer;
        button.onclick = () => handleAnswer(answer);
        answersElem.appendChild(button);
    }
}

function handleAnswer(answer) {
    const q = questions[current];
    responses.push({ question: q.question, answer: answer });
    if (q.answers[answer].action) {
        q.answers[answer].action();
    }
    current = q.answers[answer].next;

    if (current === "end") {
        const questionElem = document.getElementById('question');
        const answersElem = document.getElementById('answers');
        questionElem.innerText = questions[current].question;
        answersElem.innerHTML = '';

        const yesButton = document.createElement('button');
        yesButton.innerText = 'Yes';
        yesButton.onclick = () => saveResponses(true);
        answersElem.appendChild(yesButton);

        const noButton = document.createElement('button');
        noButton.innerText = 'No';
        noButton.onclick = () => saveResponses(false);
        answersElem.appendChild(noButton);
    } else {
        askQuestion();
    }
}


function saveResponses() {
    var replies = JSON.stringify(responses,null,2);
    replies = formatResponses(replies);
    // console.log(replies);
    askForLetter(result.answerString);
}

function formatResponses(r){
    r = r.replaceAll('\"question\"', '');
    r = r.replaceAll('\"answer\"', '');
    r = r.replaceAll('}', '');
    r = r.replaceAll('{', '');
    r = r.replaceAll(':', '');
    r = r.replaceAll('\",', '\"');
    r = r.replaceAll('\"', '');
    r = r.replaceAll(',', '');
    r = r.replaceAll(']', '');
    r = r.replaceAll('[', '');
    return r;
}


function formatText(text) {
    
    const fragment = document.createDocumentFragment();
    const parts = text.split(/(%h |%h|%sh |%sh|%b |%b)/).filter(Boolean);
    
    let element = null;
  
    parts.forEach(part => {
      if (part.startsWith('%h ')) {
        element = document.createElement('h1');
        element.textContent = part.replace('%h ', '');
        fragment.appendChild(element);
      } 
      else if (part === '%h') {
        element = null; // Closing tag
      } 
      else if (part.startsWith('%sh ')) {
        element = document.createElement('h2');
        element.textContent = part.replace('%sh ', '');
        fragment.appendChild(element);
      } 
      else if (part === '%sh') {
        element = null; // Closing tag
      } 
      else if (part.startsWith('%b ')) {
        element = document.createElement('p');
        element.textContent = part.replace('%b ', '');
        fragment.appendChild(element);
      } 
      else if (part === '%b') {
        element = null; // Closing tag
      } 
      else if (element) {
        element.textContent += part;
      }
    });

    console.log("Fragrment" + fragment);
    return fragment;
  }

askQuestion();
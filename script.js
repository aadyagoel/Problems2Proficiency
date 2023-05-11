
var submitButton = document.getElementById("Submit"); 

document.getElementById("Submit").addEventListener("click", function() {
alert('Submitted');
var start = document.getElementById("start").value; 
var final = document.getElementById("final").value; 

var p1 = "You need to produce x number of gradual problems to teach me ";
var p2 = ", starting from ";
var p3 = ". Do not produce the problems yet. How many problems would you say are required: (do not write any other words in your answer, only write the number in numeric characters).";

var prompt = p1 + final + p2 + start + p3 + " A the end of the response, print done.";
document.getElementById("prompt").innerHTML = prompt;

fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer api'
  },
  body: JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a math professor'},
      { role: 'user', content: prompt}
    ],
    temperature: 0.5,
    max_tokens: 50,
    n: 1,
    stop: "done"
  })
})
.then(response => response.json())
.then(data => {
  var responseText = data.choices[0].message.content;
  console.log(responseText);
  document.getElementById("response").innerHTML = responseText; 
  prompt2 = "Please produce" + responseText + "gradual problems to teach me" + 
final + "from the level of just knowing " + start + ".With each problem include the solution.";

fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer api'
  },
    body: JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a math professor'}, 
      { role: 'user', content: prompt2}
    ],
    temperature: 0.5,
    max_tokens: 1000,
    n: 1,
    stop: "done"
  })
})
.then(response => response.json())
.then(data => {
  var responseText2 = data.choices[0].message.content;
  console.log(responseText2);
  document.getElementById("problems").innerHTML = responseText2;
  document.getElementById("prompt2").innerHTML = prompt2; 
});
});
});
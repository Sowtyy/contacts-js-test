const data = [];
const defaults = {"textBox0": "Имя", "textBox1": "Номер телефона"};

const textBoxes = [];
const delButtons = [];

const table = document.getElementById("tbl_0");
const addButton = document.getElementById("btn_0");
textBoxes.push(document.getElementById("txtbox_0"));
textBoxes.push(document.getElementById("txtbox_1"));


function showData()
{
  if (delButtons.length > 0)
    delButtons.length = 0;

  for (let i = 0; i < data.length; i++)
  {
    const tr = table.insertRow();
    
    const tdName = tr.insertCell();
    const tdNumber = tr.insertCell();
    const tdDel = tr.insertCell();

    tdDel.id = `delbtn_${i}`;

    const newBtn = document.createElement("input");
    newBtn.type = "submit";
    newBtn.value = "Удалить";
    
    tdName.appendChild(document.createTextNode(data[i].name));
    tdNumber.appendChild(document.createTextNode(data[i].number));
    tdDel.appendChild(newBtn);

    delButtons.push(tdDel);
  }

  if (delButtons.length > 0)
  {
    for (let i = 0; i < delButtons.length; i++)
    {
      delButtons[i].addEventListener("click", (event) =>
      {
        data.splice(parseInt(delButtons[i].id.split("_", 2)[1]), 1);
        refreshLocalStorage("data", data);
        refreshRows();
        //table.deleteRow(delButtons[i].id.split("_")[1]);
      });
    }
  }
}

function clearRows()
{
  while (table.rows.length > 1)
  {
    table.deleteRow(1);
  }
}

function refreshRows()
{
  clearRows();
  showData();
}

function refreshLocalStorage(name, data)
{
  if (localStorage.length > 0)
    localStorage.removeItem(name);
  
  localStorage.setItem(name, JSON.stringify(data));
}

function checkTextBoxDefault(index)
{
  return (textBoxes[index].value == "" || textBoxes[index].value == defaults[`textBox${index}`]);
}


addButton.addEventListener("click", (event) =>
{
  if (checkTextBoxDefault(0) || checkTextBoxDefault(1))
    return;

  data.push({name: textBoxes[0].value, number: textBoxes[1].value});
  refreshLocalStorage("data", data);

  refreshRows();

  textBoxes[0].value = defaults.textBox0;
  textBoxes[1].value = defaults.textBox1;
});

for (let i = 0; i < textBoxes.length; i++)
{
  textBoxes[i].addEventListener("click", (event) =>
  {
    if (!checkTextBoxDefault(i))
      return;
    
    textBoxes[i].value = "";
  });
}


if (localStorage.length > 0)
  for(const item of JSON.parse(localStorage.data))
    data.push(item);
else
  data.push({name: "Добавьте имя", number: "Добавьте номер"});


showData();

console.log(data);
console.log(localStorage);
//console.log(JSON.parse(""));

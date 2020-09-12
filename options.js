let defaultFilters = "Split,PARM1=,PARM1=,1\n" +
  "Split,murl=,murl=,1\n" + "Split,clicks.slickdeals.net/i.php?u1=http,u2=,1\n" +
  "Split,?gclid,&url=,0\n" + "Split,link=,link=,1\n" + "Split,u=,u=,1\n" +
  "Split,h=,h=,0\n" + "Split,utm_,utm_,0\n" + "Split,&nm_,&nm_,0\n" +
  "Split,ref=,ref=,0\n" + "Split,u1=,u1=,0\n" + "Split,u2=,u2=,1\n" + "Split,mpre=,ref=,0\n" +
  "Split,&a=,&a=,0\n" + "Split,q=,q=,1\n" + "Split,token=,token=,0\n" +
  "Split,&sa=D&,&sa=D&,0\n" + "Split,html_redirect,&html_redirect,0\n" +
  "Split,&v=,&v=,0\n" + "Split,&mpre=,&mpre=,1\n" +
  "Split,&event=,&event=,0\n" + "Split,&redir_,&redir,0\n" +
  "Replace,amp/,amp/s/,amp/s/https://\n" + "Split,amp/s,amp/s/,1\n" + "Replace,amp/,amp/,\n" +
  "Split,bhphotovideo.com,.html,0\n" + "Append,bhphotovideo.com,.html/\n" + "Replace,monoprice.com/,url=,&red=" +
  "Replace,tkqlhce.com,url=,url=https://staples.com\n" +
  "Split,dest_url=,dest_url=,1\n" + "Split,adurl=,adurl=,1\n" + "Split,url=,url=,1\n" + "Split,ved=,ved=,0\n" + "Split,src=,src=,0\n" + "Split,source=,source=,0\n" +
  "Split,&red=,&red=,1\n" + "Split,?pf_rd_r=,?pf_rd_r=,0\n" + "Split,d=sec,d=sec,0\n" + "Split,wmlspartner=,wmlspartner=,0\n" + "Split,&l0=,&l0=,1\n" +
  "Split,CID,CID,0\n";

var finalFilter = "";
var hasError = false;
function saveOptions(e) {
  document.getElementById('heading').innerHTML = 'Saving...';
  hasError = false;
  validFilters(document.querySelector("#filters").value)
  browser.storage.sync.set({
    filters: finalFilter
  });
  document.getElementById('heading').innerHTML = 'Saving complete.'
  if (!hasError) {
    document.getElementById('heading2').innerHTML = 'Reloading';
    location.reload();
  }
  e.preventDefault();
}
function resetOptions(e) {
  document.getElementById('heading').innerHTML = "Default Filters applied";
  document.getElementById('heading2').innerHTML = "";
  document.getElementById('filters').value = defaultFilters;
  e.preventDefault();
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#filters").value = result.filters || defaultFilters;
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.sync.get("filters");
  getting.then(setCurrentChoice, onError);
}

function validFilters(str) {
  console.log(str);
  lines = str.split(/\r\n|\r|\n/g);
  console.log(lines);

  document.getElementById('heading2').innerHTML = "";
  for (i = 0; i < lines.length; i++) {
    filter = lines[i].split(/,/g);
    if (filter.length === 4 && isEqual(filter[0], "split")) {
      index = parseInt(filter[3]);
      if (isNaN(index)) {
        console.log(index);
        document.getElementById('heading2').innerHTML += 'error on line ' + (parseInt(i) + 1) + "\n" + filter[3] + " is not a nubmer";
      }
      saveFilters(lines[i]);
    } else if ((filter.length === 4 || filter.length === 3) && isEqual(filter[0], "replace")) {
      saveFilters(lines[i]);
    } else if (filter.length === 3 && (isEqual(filter[0], "append") || isEqual(filter[0], "prepend"))) {
      saveFilters(lines[i]);
    } else if (lines[i] === "") {
      document.getElementById('heading2').innerHTML += ' Done!';
    } else {
      document.getElementById('heading2').innerHTML += ' error on line ' + (parseInt(i) + 1);
      console.log("what else is there? \n" + lines[i]);
      hasError = true;
    }

  }
}

function saveFilters(str) {
  finalFilter += str + "\n";
  console.log(finalFilter);
}

function isEqual(str1, str2) {
  return str1.toUpperCase() === str2.toUpperCase()
}
document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.querySelector("form").addEventListener("reset", resetOptions);
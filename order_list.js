var green_salad=document.getElementById('green_salad');
var shaved_salad=document.getElementById('shaved_salad');
var count_green1=0;
var output=document.getElementById('output');
function inc()
{
    count_green1++;
    alert(count_green1);
    if(count_green1==1)
    {
        console.log('working');
        var node=document.createElement('LI');
        var textnode=document.createTextNode('Green Goddess Salad');
        node.appendChild(textnode);
        
    }
}


# Firefox_Link_Cleaner
A Firefox extension to clean links 

This is a Firefox extension of an [Android app](https://github.com/Lucknell/Link_Cleaner) that I made to do the same basic link cleaning function.
## Activation
At the moment this extension requires the user to click the broom icon from the menu bar or to right click the link to clean the link in the current tab or to open a new tab. Clicking the broom icon will clean the link in the current tab.


## Filters

This extension uses custom filters to remove the extra data tacked onto links from various sites. The 4 filters that it uses are **Split, Replace, Append and Prepend.** The filters are organized as comma separated with a new line indicating a new filter.
> Split,url=,url=,1
> Replace,tkqlhce.com,url=,url=https://staples.com
> Append,bhphotovideo.com,.html/

### Split
> Split,url=,url=,1

Split will take the URL and cut it into a list of strings based on what you chose to split the original URL by. In the above example we will take the comma separated arguments and break down the function of each. The first argument **Split** tells the extension to prepare to break up the URL. The second argument **url=** is used as a check to only proceed further if the URL contains *url=*. The third argument **url=** is what we want to split the URL by to make a list. The final argument **1** tells the extension which index to take from the list. The index can be any number starting from 0 onward. 

#### Example
```
This URL has an unnecessary redirect that could be bypassed.
https://click.linksynergy.com/deeplink?u1=5cd4acb4f54511eaad369aec81e22f080INT&id=lw9MynSeamY&mid=44583&murl=https%3A%2F%2Fwww.newegg.com%2Fabs-computer-technologies-ala196%2Fp%2FN82E16883102947%3Fsdtid%3D14337101%26Item%3DN82E16883102947

With the above filter Split would match this URL and make a list like below.
-https://click.linksynergy.com/deeplink?u1=5cd4acb4f54511eaad369aec81e22f080INT&id=lw9MynSeamY&mid=44583&m
-https%3A%2F%2Fwww.newegg.com%2Fabs-computer-technologies-ala196%2Fp%2FN82E16883102947%3Fsdtid%3D14337101%26Item%3DN82E16883102947

With the above list there are two items. The numbering will start from 0. With the filter applied we will take the data at index 1 which will lead to newegg.com.
```

### Replace
> Replace,tkqlhce.com,url=,url=https://staples.com

Replace will take the URL and find a the string from the third argument and substitute it with the string from the fourth argument.In the above example we will take the comma separated arguments and break down the function of each. The first argument **Replace** tells the extension to prepare to substitute a string in the URL. The second argument **tkq1hce.com** is used as a check to only proceed further if the URL contains *tkq1hce.com*. The third argument **url=** is the the part of the string that will be substituted with the final argument. The final argument **url=https://staples.com** is what is placed into the URL in the place of the third. The final argument can also be `` just to remove the third argument from the URL.

#### Example
```
With the above filter Replace would match this URL and substitute *url=* with *url=https://staples.com*.
https://www.tkqlhce.com/click-4485850-11965372?sid=da3a9aaaf54611eaaad2266c2775f9cb0INT&url=%2Fastrodesigns-2-sided-preprinted-stationery-8-5-x-11-parchment-map-50-sheets-pack-91280%2Fproduct_2718882

would then become 

https://www.tkqlhce.com/click-4485850-11965372?sid=da3a9aaaf54611eaaad2266c2775f9cb0INT&url=staples.com%2Fastrodesigns-2-sided-preprinted-stationery-8-5-x-11-parchment-map-50-sheets-pack-91280%2Fproduct_2718882

A subsequent filter would remove the redirect and return to us the URL for staples.com.
```

### Append
> Append,bhphotovideo.com,.html/

Append will take the URL and add the third argument to the end of the URL. In the above example we will take the comma separated arguments and break down the function of each. The first argument **Append** tells the extension to prepare to add the third argument on to the URL. The second argument **bhphotovideo.com** is used as a check to only proceed further if the URL contains *bhphotovideo.com*. The final argument **.html/** get added to the end of the current URL.

#### Example
```
With the above filter it will solve an issue we created in a previous filter.
https://www.bhphotovideo.com/c/product/1388935-REG/polk_audio_am9636_s30_american_hifi_home.html/SID/4b09a6b8f56511ea92822662775f9cb0INT
The filter "Split,bhphotovideo.com,.html,0" we removed the ".html" from the link leaving us with this:
https://www.bhphotovideo.com/c/product/1388935-REG/polk_audio_am9636_s30_american_hifi_home
This link usually will work as is but to prevent issues we can use the Append filter to add the .html back onto the link like below:
https://www.bhphotovideo.com/c/product/1388935-REG/polk_audio_am9636_s30_american_hifi_home.html/
```

### Prepend

Prepend is an available option but not one that is actively used in any form at the moment.

## TODO
- Realtime cleaning
- Better handling of custom filters pane
- Update the icon to a less blurry broom
- Port to chrome(?) 
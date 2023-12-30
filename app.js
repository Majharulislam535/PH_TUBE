

const convertSeconds = (seconds) => {
    const number = parseInt(seconds);
    const hours = Math.floor(number / 3600)
    const minutes = Math.floor((number % 3600) / 60)

    if (hours > 0) {
        return `${hours} hrs ${minutes} min ago`
    } else {
        return `${minutes} min ago`
    }
}




fetch('https://openapi.programming-hero.com/api/videos/categories')
    .then(res => res.json())
    .then(data => showCategory(data.data))


const showCategory = (data) => {
    const cate_id = document.getElementById('cate_id');
    data.forEach(dt => {
        const btn = document.createElement('button');
        btn.classList.add('btn', 'category_btn', 'mx-2',);
        
        let clicked = false;

        btn.addEventListener('click', () => {
            if (!clicked) {
                document.querySelector('.active')?.classList.remove('active');
                btn.classList.toggle('active');
                cate_Data(dt.category_id);
            }
        });

        btn.innerText = dt.category;
        cate_id.appendChild(btn);
        btn.addEventListener('click', () => cate_Data(dt.category_id));
    })


    cate_id.children[0].classList.add('active');
}






const cate_Data = (category_id) => {
    fetch(`https://openapi.programming-hero.com/api/videos/category/${category_id}?${category_id}:1000`)
        .then(res => res.json())
        .then(data => showData(data.data));
}


const showData = (data) => {
    const card_body = document.getElementById('card_body');
    card_body.innerHTML = '';

    const error = document.getElementById('error');
    error.innerHTML = '';
    if (data.length == 0) {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="text-center">
        <img src="./img/Icon.png" alt="">
      
            <h2 class="p-4">
             Oops!! Sorry, There is no <br> content here
            </h2>
           </div>
        
        `;
        error.appendChild(div);

    }
    else {

        data.forEach(dt => {
            const card = document.createElement('div');
            card.classList.add('col-sm-3');
            card.innerHTML = `
            <div class="card" style="width: 100%; border: none;">
            <div class="position-relative">
             <img src="${dt.thumbnail
                }" class="card-img-top " alt="...">
              ${dt.others.posted_date ? `
              <span style="width: 50%; right: 5%; top: 80%;" class="badge text-bg-dark position-absolute ">${convertSeconds(dt.others.posted_date)}</span>
              `: ''}
            </div>
  
             <div class="card-body">
               <div class="row">
                   <div class="col-3">
                       <img width="100%" src="${dt.authors[0].profile_picture}" class="rounded-circle" alt="">
                   </div>
                    <div class="col-9 px-2">
                        <p class="pb-2" style="font-size: 14px; margin-bottom: 0px;"><b>${dt.title}</b></p>
                        <p style="font-size: 14px;color: #171717b3; margin-bottom: 0px;">${dt.authors[0].profile_name} ${dt.authors[0].verified ? ` <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <g clip-path="url(#clip0_11_215)">
                          <path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
                          <path d="M12.7094 7.20637L9.14062 10.7751L7.29062 8.92669C6.88906 8.52512 6.23749 8.52512 5.83593 8.92669C5.43437 9.32825 5.43437 9.97981 5.83593 10.3814L8.43124 12.9767C8.82187 13.3673 9.45624 13.3673 9.84687 12.9767L14.1625 8.66106C14.5641 8.2595 14.5641 7.60794 14.1625 7.20637C13.7609 6.80481 13.1109 6.80481 12.7094 7.20637Z" fill="#FFFCEE"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_11_215">
                            <rect width="20" height="20" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>` : ' '}</p> 
                        <p style="font-size: 14px;color: #171717b3;">${dt.others.views} views</p>
                    </div>
               </div>
             </div>
           </div>
            `;
            card_body.appendChild(card);
        })


    }
}



const sortFunction = (data) => {
    fetch('https://openapi.programming-hero.com/api/videos/category/1000')
        .then(res => res.json())
        .then(data => showSort(data.data))
}


const showSort = (data) => {

    data.sort((a, b) => {
        let str = a.others.views;
        str1 = str.slice(0, -1);
        let strs = b.others.views;
        str2 = strs.slice(0, -1);

        if (parseFloat(str1) < parseFloat(str2)) return 1;
        else if (parseFloat(str1) > parseFloat(str2)) return -1;
        else return 0;
    })
    const error = document.getElementById('error');
    error.innerHTML = '';

    const card_body = document.getElementById('card_body');
    card_body.innerHTML = '';

    data.forEach(dt => {
        const card = document.createElement('div');
        card.classList.add('col-sm-3');
        card.innerHTML = `
        <div class="card" style="width: 100%; border: none;">
        <div class="position-relative">
         <img src="${dt.thumbnail
            }" class="card-img-top " alt="...">
          ${dt.others.posted_date ? `
          <span style="width: 50%; right: 5%; top: 80%;" class="badge text-bg-dark position-absolute ">${convertSeconds(dt.others.posted_date)}</span>
          `: ''}
        </div>

         <div class="card-body">
           <div class="row">
               <div class="col-3">
                   <img width="100%" src="${dt.authors[0].profile_picture}" class="rounded-circle" alt="">
               </div>
                <div class="col-9 px-2">
                    <p class="pb-2" style="font-size: 14px; margin-bottom: 0px;"><b>${dt.title}</b></p>
                    <p style="font-size: 14px;color: #171717b3; margin-bottom: 0px;">${dt.authors[0].profile_name} ${dt.authors[0].verified ? ` <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <g clip-path="url(#clip0_11_215)">
                      <path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
                      <path d="M12.7094 7.20637L9.14062 10.7751L7.29062 8.92669C6.88906 8.52512 6.23749 8.52512 5.83593 8.92669C5.43437 9.32825 5.43437 9.97981 5.83593 10.3814L8.43124 12.9767C8.82187 13.3673 9.45624 13.3673 9.84687 12.9767L14.1625 8.66106C14.5641 8.2595 14.5641 7.60794 14.1625 7.20637C13.7609 6.80481 13.1109 6.80481 12.7094 7.20637Z" fill="#FFFCEE"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_11_215">
                        <rect width="20" height="20" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>` : ' '}</p> 
                    <p style="font-size: 14px;color: #171717b3;">${dt.others.views} views</p>
                </div>
           </div>
         </div>
       </div>
        `;
        card_body.appendChild(card);
    })


}


cate_Data('1000');
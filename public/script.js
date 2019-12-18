const myTable = document.getElementById('myTable');

fetch('http://localhost:3000/api/resurser')
	.then(res => {
		// Check if we can connect
		if (res.status !== 200) {
			return console.log('Could not GET url');
		}
		return res.json();
	})
	.then(response => {
		let muligheder = response;
		return muligheder.map(muligheder => {
			let tr = document.createElement('tr');
			let td = document.createElement('td');
			let td2 = document.createElement('td');
			let td3 = document.createElement('td');
			let td4 = document.createElement('td');
			let td5 = document.createElement('td');
			let td6 = document.createElement('td');
            let td7 = document.createElement('td');
            let td8 = document.createElement('td');
			
			td.innerHTML = muligheder.muligheder_by;
			td2.innerHTML = muligheder.muligheder_kategori;
            td3.innerHTML = muligheder.muligheder_navn;
            td4.innerHTML = muligheder.muligheder_beskrivelse;
            td5.innerHTML = muligheder.muligheder_adresse;
            td6.innerHTML = muligheder.muligheder_telefon;
            td7.innerHTML = muligheder.muligheder_åbningstider;
            td8.innerHTML = muligheder.muligheder_webside;
            
			// Append the data to the row
			tr.appendChild(td);
			tr.appendChild(td2);
			tr.appendChild(td3);
			tr.appendChild(td4);
			tr.appendChild(td5);
			tr.appendChild(td6);
            tr.appendChild(td7);
            tr.appendChild(td8);
			myTable.appendChild(tr);
		});
	})
	.catch(err => {
		console.log(err);
	});
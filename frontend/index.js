import { backend } from "declarations/backend";

document.addEventListener('DOMContentLoaded', async () => {
    const addForm = document.getElementById('addTaxPayerForm');
    const searchForm = document.getElementById('searchForm');
    const taxPayerList = document.getElementById('taxPayerList');
    const searchResult = document.getElementById('searchResult');

    addForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const taxPayer = {
            tid: document.getElementById('tid').value,
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            address: document.getElementById('address').value
        };
        await backend.addTaxPayer(taxPayer);
        addForm.reset();
        await updateTaxPayerList();
    });

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const tid = document.getElementById('searchTid').value;
        const result = await backend.searchTaxPayer(tid);
        if (result.length > 0) {
            const taxPayer = result[0];
            searchResult.innerHTML = `
                <p>TID: ${taxPayer.tid}</p>
                <p>Name: ${taxPayer.firstName} ${taxPayer.lastName}</p>
                <p>Address: ${taxPayer.address}</p>
            `;
        } else {
            searchResult.innerHTML = '<p>No TaxPayer found with this TID.</p>';
        }
    });

    async function updateTaxPayerList() {
        const taxPayers = await backend.getAllTaxPayers();
        taxPayerList.innerHTML = '';
        taxPayers.forEach(tp => {
            const li = document.createElement('li');
            li.textContent = `${tp.tid}: ${tp.firstName} ${tp.lastName}, ${tp.address}`;
            taxPayerList.appendChild(li);
        });
    }

    await updateTaxPayerList();
});

import React, { useState, useEffect } from 'react'
import '../styles/style.css'
import { customerSuccessBalancing, getMostBusyCs } from '../components/balancing.js'


const customerList = [
  {id: 1, level: 20, name: 'cliente01'}, 
  {id: 2, level: 30, name: 'cliente02'}, 
  {id: 3, level: 35, name: 'cliente03'}, 
  {id: 4, level: 40, name: 'cliente04'}, 
  {id: 5, level: 60, name: 'cliente05'}, 
  {id: 6, level: 80, name: 'cliente06'}
]
const customerSuccessList = [
  {id: 1, level: 50, name: 'cs01'}, 
  {id: 2, level: 100, name: 'cs02'},
  {id: 3, level: 200, name: 'cs03'}
]
const customerSuccessUnavailableList = [3]

export default function Example() {
  const [csName, setCsName] = useState("");
  const [csId, setCsId] = useState("");
  const [csLevel, setCsLevel] = useState("");
  
  const [clientName, setClientName] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientLevel, setClientLevel] = useState("");
  
  const [csBalancingResult, setCsBalancingResult] = useState([])
  

  useEffect(() => {
    updateBalancing()
  }, []);

  const updateBalancing = () => setCsBalancingResult(customerSuccessBalancing(customerSuccessList, customerList, customerSuccessUnavailableList))
  
  const getListsResume = (csList, customerList) => {
    return <>
        <p className="mt-1 text-sm text-gray-600">
          Customer Success disponiveis: {csList.map((cs, key) => (
              <span key={key} className='block'>{
                'ID: ' + cs.id 
                + ', level: ' + cs.level 
                + ', name: ' + cs.name 
                // + ', clientes: ' + cs.count
              }</span>
            ))}
        </p>
        <p className="mt-5   text-sm text-gray-600">
          Clientes disponiveis: {customerList.map((cliente, key) => (
              <span key={key} className='block'>{
                'ID: ' + cliente.id 
                +' ,level: ' + cliente.level 
                + ', name: ' + cliente.name 
              }</span>
            ))}
        </p>
        
        {csBalancingResult && getMostBusyCs(csBalancingResult).map((cs, key) => 
          <p key={key} className="mt-5 text-sm text-gray-600">
            O Customer Success id {cs.id} ({cs.name}) tem {cs.count} clientes
          </p>
        )}
    </>
  }
  
  const addCs = (e) => {
    // validar dados
    customerSuccessList.push({id: csId, level: csLevel, name: csName})
    setCsName('')
    setCsId('')
    setCsLevel('')
    updateBalancing()
  }
  
  const addClient = (e) => {
    // validar dados
    customerList.push({id: clientId, level: clientLevel, name: clientName})
    setClientName('')
    setClientId('')
    setClientLevel('')
    updateBalancing()
  }

  return (
    <>
      <div className="min-h-full">

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Customer Success Balancing</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{
            <div className="mt-10 sm:mt-0">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="mt-5 md:mt-0">
                  <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                              CS ID*
                          </label>
                          <input
                              value={csId}
                              onChange={(e) => setCsId(e.target.value)}
                              type="text"
                              name="cs-id"
                              id="cs-id"
                              autoComplete="cs-id"
                              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                              CS Level*
                          </label>
                          <input
                              value={csLevel}
                              onChange={(e) => setCsLevel(e.target.value)}
                              type="text"
                              name="cs-level"
                              id="cs-level"
                              autoComplete="cs-level"
                              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                              CS Name
                          </label>
                          <input
                              value={csName}
                              onChange={(e) => setCsName(e.target.value)}
                              type="text"
                              name="first-name"
                              id="first-name"
                              autoComplete="given-name"
                              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>

                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                      <button
                          type="button"
                          className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                          onClick={addCs}
                      >
                          Add
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-5 md:mt-0">
                  <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                              Client ID
                          </label>
                          <input
                              value={clientId}
                              onChange={(e) => setClientId(e.target.value)}
                              type="text"
                              name="cs-id"
                              id="cs-id"
                              autoComplete="cs-id"
                              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                              Client Level*
                          </label>
                          <input
                              value={clientLevel}
                              onChange={(e) => setClientLevel(e.target.value)}
                              type="text"
                              name="cs-level"
                              id="cs-level"
                              autoComplete="cs-level"
                              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                              Client Name
                          </label>
                          <input
                              value={clientName}
                              onChange={(e) => setClientName(e.target.value)}
                              type="text"
                              name="first-name"
                              id="first-name"
                              autoComplete="given-name"
                              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>

                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                      <button
                          type="button"
                          className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                          onClick={addClient}
                      >
                          Add
                      </button>
                    </div>
                  </div>
                </div>
                

                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0">
                    { getListsResume (csBalancingResult, customerList) }
                  </div>
                </div>
                
              </div>
            </div>
            }</div>
            </main>
        </div>
    </>
    )
}

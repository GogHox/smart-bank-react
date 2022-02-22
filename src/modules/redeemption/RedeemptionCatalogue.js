import React, { Component } from 'react';
import axios from 'axios';
import { API_URL } from '../../Constants';

class RedeemptionCatalogue extends Component {

    state = {
        catalogueList: [],
        isListLoaded: false
    }

    constructor(props) {
        super(props);

        this.state = {
            catalogueList: [],
            isListLoaded: false
        };
    }

    async fetchCatalogueList() {
        await axios.get(API_URL + 'catalogue/')
            .then(response => {

                this.setState(
                    {

                        catalogueList: response.data.body,
                        isListLoaded: true
                    }, () => {
                       
                    }
                )



            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response);

                } else if (error.request) {
                    console.log(error.request);

                } else {
                    console.log(error);

                }
            })
    }

    componentDidMount() {

        this.fetchCatalogueList()
    }


    render() {


        let { isListLoaded, catalogueList } = this.state;
        if (!isListLoaded) {

            return (
                <div>Loading the catalogue. Please Wait...</div>
            )
        } else {
            return (
                <div className="redeemption-catalogue">

                    <h4>Your Redeemption Catalogue</h4>
                    <h6 className="text-muted"><i>Select items below to redeem your points</i></h6>
                        Total items found :- {catalogueList.length}
                    <hr></hr>

                  <div className="">
                      {
                          catalogueList.map( c=> (
                              <div key={c.id}>{c.item} </div>
                              
                          ))
                      }
                  </div>

                </div>
            );
        }



    }
}

export default RedeemptionCatalogue;
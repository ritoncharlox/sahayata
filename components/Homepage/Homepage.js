import React from 'react'
import HomepageClient from './Client/Homepage';
import prisma from '@/config/prisma';


const Homepage = async() => {
    const getServices = async ()=>{
        const service = await prisma.service.findMany();

        if(!service){
            return ;
        }
        return service;
        
    }
    const services = await  getServices();

    return (
        <>
            <HomepageClient services={services}/>
        </>
    )
}

export default Homepage

import React from 'react'
import empty from '../../assets/images/empty.png'
import CommunityCard from '../utils/CommunityCard';

function CommunityContainer({communities}) {
    if(communities.length == 0){
        return(
            <div>
                <img src={empty} className='mx-auto w-72' alt="" />
            </div>
        );
    }
  return (
    <div className='grid grid-cols-1 gap-3'>
      {
        communities.map((community) => {
            return(
                <CommunityCard community={community}></CommunityCard>
            );
        })
      }
    </div>
  )
}

export default CommunityContainer

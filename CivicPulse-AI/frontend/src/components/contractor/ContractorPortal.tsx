import { useEffect,useState } from 'react'; import { fetchAssignedWork } from '@/services/contractorService'; import type { Complaint } from '@/types';
export default function ContractorPortal(){const [items,setItems]=useState<Complaint[]>([]);useEffect(()=>{fetchAssignedWork().then(setItems).catch(()=>{})},[]);return <div>{items.length} assigned civic tasks</div>}

import { register, getList, remove } from './async-action' ;
import { store$, errorAction, clearErrorAction } from './store';
import Vue, { CreateElement, VNode } from 'vue';
interface workerInterface{
    name:string;
    id:number;
    photo:string;
    bio:string;
}
new Vue({
    el:'#workerApp',
    render(ce:CreateElement):VNode{
        return ce('div',[
            ce('div',[
                ce('p',{class:'error'},this.error !== null?this.error.toString():''),
                this.loading?
                ce('p',{class:'primary'},'memuat...'):null
            ]),
            ce('div',[
                ce('h4','Daftarkan Pekerja Baru'),
                ce('form',{
                    on:{
                        submit:this.submitNewWorker
                    }
                },[
                    ce('label','Nama : '),
                    ce('input',{
                        domProps:{'placeholder':'misal Budiman'},
                        on:{
                            input:(event)=>{
                                this.input.name = event.target.value
                            }
                        }
                    },this.input.name),
                    ce('br'),
                    ce('label','Umur : '),
                    ce('input',{
                        domProps:{'placeholder':'misal 23'},
                        on:{
                            input:(event)=>{
                                this.input.age = event.target.value
                            }
                        }
                    },this.input.age),
                    ce('br'),
                    ce('label','Foto : '),
                    ce('input',{
                        domProps:{'type':'file'},
                        on:{
                            input:(event)=>{
                                this.input.photo = event.target.files[0]
                            }
                        }
                    },this.input.photo),
                    ce('br'),
                    ce('label','Biodata Singkat : '),
                    ce('br'),
                    ce('input',{
                        domProps:{'placeholder':'biodata singkat pekerja','cols':30,'rows':3},
                        on:{
                            input:(event)=>{
                                this.input.bio = event.target.value
                            }
                        }
                    },this.input.bio),
                    ce('br'),
                    ce('label','Alamat : '),
                    ce('br'),
                    ce('input',{
                        domProps:{'placeholder':'alamat pekerja','cols':30,'rows':3},
                        on:{
                            input:(event)=>{
                                this.input.address = event.target.value
                            }
                        }
                    },this.input.address),
                    ce('br'),
                    ce('button',{domProps:{'type':'submit'}},'kirim'),
                    ce('hr'),
                ])
                
            ]),
            ce('div',[
                ce('h4','Daftar Pekerja'),
                ce('ul',[
                    this.workers.map((worker:workerInterface)=>{
                        return ce('li',{
                            domProps:{'id':worker.id}
                        },[
                            ce('img',{
                                domProps:{'src':worker.photo,'width':30,'height':30,},
                            }),
                            ce('span',' ' + worker.name),
                            ce('button',{
                                on:{
                                    click:()=>{
                                        store$.dispatch<any>(remove(worker.id))
                                    }
                                }
                            },'hapus')
                        ])
                    })
                ])
            ])
        ])
    },
    data:{
        input:{
            name:'',
            age:0,
            bio:'',
            address:'',
            photo:null
        },
        workers:[],
        error:null,
        loading:false,
    },
    methods:{
        submitNewWorker(event){
            event.preventDefault();
            if(this.input.name&&this.input.age&&this.input.bio&&this.input.address&&this.input.photo){
                store$.dispatch<any>(register(this.input))
                event.target.reset()
            }
            return
        }
    },
    mounted(){
        this.workers = store$.getState().workers;
        this.error = store$.getState().error;
        this.loading = store$.getState().loading;
        store$.subscribe(()=>{
            this.workers = store$.getState().workers;
            this.error = store$.getState().error;
            this.loading = store$.getState().loading;
        })
        store$.dispatch<any>(getList)
    }
})
import { register, getList, remove } from './async-action' ;
import { store$, errorAction, clearErrorAction } from './store';
import Vue, { CreateElement, VNode } from 'vue';

new Vue({
    el:'#workerApp',
    render(ce:CreateElement):VNode{
        return ce('div',[
            ce('div',[
                ce('p',{class:'error'},''),
                ce('p',{class:'primary'},'memuat...')
            ]),
            ce('div',[
                ce('h4','Daftarkan Pekerja Baru'),
                ce('form',{domProps:{'method':'post'}},[
                    ce('label','Nama : '),
                    ce('input',{domProps:{'placeholder':'misal Budiman'}}),
                    ce('br'),
                    ce('label','Umur : '),
                    ce('input',{domProps:{'placeholder':'misal 23'}},''),
                    ce('br'),
                    ce('label','Foto : '),
                    ce('input',{domProps:{'type':'file'}},''),
                    ce('br'),
                    ce('label','Biodata Singkat : '),
                    ce('br'),
                    ce('textarea',{domProps:{'placeholder':'biodata singkat pekerja','cols':30,'rows':3}},''),
                    ce('br'),
                    ce('label','Alamat : '),
                    ce('br'),
                    ce('textarea',{domProps:{'placeholder':'alamat pekerja','cols':30,'rows':3}},''),
                    ce('br'),
                    ce('button',{domProps:{'type':'submit'}},'kirim'),
                    ce('hr'),
                ])
                
            ]),
            ce('div',[
                ce('h4','Daftar Pekerja'),
                ce('div',)
            ])
        ])
    },
    data:{
        workers:[],
        error:null,
        loading:false,
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
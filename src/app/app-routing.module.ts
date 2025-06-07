
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { CajaGuard } from './core/guards/caja.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [

                    {
                        path: 'aplicaciones', loadChildren: () => import('./features/aplicaciones/aplicaciones.module').then(m => m.AplicacionesModule),
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'clientes', loadChildren: () => import('./features/clientes/clientes.module').then(m => m.ClienteModule),
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'compras', loadChildren: () => import('./features/compras/compras.module').then(m => m.ComprasModule),
                        canActivate: [AuthGuard, CajaGuard]
                    },
                    {
                        path: 'ventas', loadChildren: () => import('./features/ventas/ventas.module').then(m => m.VentasModule),
                        canActivate: [AuthGuard, CajaGuard]
                    },
                    {
                        path: 'etapas', loadChildren: () => import('./features/etapas/etapas.module').then(m => m.EtapasModule),
                        canActivate: [AuthGuard, CajaGuard]
                    },
                    {
                        path: 'productos', loadChildren: () => import('./features/productos/producto.module').then(m => m.ProductoModule),
                        canActivate: [AuthGuard, CajaGuard]
                    },
                    {
                        path: 'potreros', loadChildren: () => import('./features/potreros/potreros.module').then(m => m.PotrerosModule),
                        canActivate: [AuthGuard,AdminGuard]
                    },
                    {
                        path: 'proveedores', loadChildren: () => import('./features/proveedores/proveedores.module').then(m => m.ProveedorModule),
                        canActivate: [AuthGuard, CajaGuard]
                    },

                    {
                        path: 'animales', loadChildren: () => import('./features/animales/animales.module').then(m => m.AnimalesModule),
                        canActivate: [AuthGuard,AdminGuard]
                    },
                    {
                        path: 'tipo-unidad', loadChildren: () => import('./features/tipo-unidad/tipo-unidad.module').then(m => m.TipoUnidadModule),
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'tipo-producto', loadChildren: () => import('./features/tipo-producto/tipo-producto.module').then(m => m.TipoProductoModule),
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'insumos', loadChildren: () => import('./features/insumos/insumos.module').then(m => m.InsumosModule),
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'usuarios', loadChildren: () => import('./features/usuarios/usuarios.module').then(m => m.UsuariosModule),
                        canActivate: [AuthGuard,AdminGuard]
                    },
                    {
                        path: 'cambiar-clave', loadChildren: () => import('./features/cambiar-clave/cambiar-clave.module').then(m => m.CambiarClaveModule),
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'reportes', loadChildren: () => import('./features/reportes/reportes.module').then(m => m.ReportesModule),
                        canActivate: [AuthGuard, CajaGuard]
                    },


                ]
            },
            { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

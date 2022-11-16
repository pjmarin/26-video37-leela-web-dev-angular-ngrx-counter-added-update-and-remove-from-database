En este video hemos implementado la funcionalidad de editar y borrar post en el server
Ahora para mostrar la id de mongo o la que nosotros asignamos en el front, en la tabla,
solo debemos cambiar:

<tbody>
      <tr *ngFor="let post of postsData">
          <td>{{ post.id }}</td>

por:

<tbody>
      <tr *ngFor="let post of postsData">
          <td>{{ post._id }}</td>

o viceversa


Hemos definido los metodos en el service y los effects en el archivo de post effects, 
tambien hemos agregado las 2 actions que faltaban updatePostSuccess y deletePostSuccess
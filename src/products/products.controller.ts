import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCTS_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCTS_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  // here you can add your controller methods CRUD

  @Get()
  getAll(@Query() PaginationDto: PaginationDto) {
    return this.productsClient.send({ cmd: 'findAllProducts' }, PaginationDto);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.productsClient.send({ cmd: 'findOneProduct' }, { id }).pipe(
      catchError((error) => {
        console.log(error);
        throw new RpcException(error);
      }),
    );
    // try {
    //   return await firstValueFrom(
    //     this.productsClient.send({ cmd: 'findOneProduct' }, { id }),
    //   );
    // } catch (error) {
    //   console.log(error);
    //   throw new RpcException(error);
    // }
  }

  @Post() create(@Body() createProductDto: CreateProductDto) {
    return this.productsClient.send({ cmd: 'createProduct' }, createProductDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsClient
      .send({ cmd: 'updateProduct' }, { id, ...updateProductDto })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsClient.send({ cmd: 'removeProduct' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}

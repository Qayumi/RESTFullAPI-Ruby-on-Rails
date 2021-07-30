module Api
  module V1
    class ApimodelController  <  ApplicationController
      def index
        apimodel= Apimodel.order('created_at DESC');
        render json: {status: 'SUCCESS', message:'Loaded Article', data:apimodel}, status: :ok

      end

      def show
        apimodel= Apimodel.find(params[:id])
        render json: {status: 'SUCCESS', message:'Loaded Article', data:apimodel}, status: :ok
        end

       def create
         apimodel=Apimodel.new(apimodel_params)

         if apimodel.save
          render json: {status: 'SUCCESS', message:'saved Article', data:apimodel}, status: :ok
        else
          render json: {status: 'ERROR', message:'Not saved', data:apimodel.errors}, status: :unprocessable_entity
         end
       end


       def destroy
       apimodel= Apimodel.find(params[:id])
       apimodel.destroy
       render json: {status: 'SUCCESS', message:'deleted Article', data:apimodel}, status: :ok
       end

       def update
         apimodel= Apimodel.find(params[:id])
            if apimodel.update(apimodel_params)
            render json: {status: 'SUCCESS', message:'updated Article', data:apimodel}, status: :ok
            else
            render json: {status: 'ERROR', message:'Not updated', data:apimodel.errors}, status: :unprocessable_entity
           end
       end

      private
      def apimodel_params
        params.permit(:title, :body)
      end


   end
 end
end

5.times do
  Apimodel.create({
    title: Faker::Book.title,
    body: Faker::Lorem.sentence
    })
end
